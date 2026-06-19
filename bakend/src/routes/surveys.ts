import { Router } from 'express';
import prisma from '../prismaClient';
import { ensureAdmin } from '../middlewares/auth';

const publicRouter = Router();
const adminRouter = Router();

const parseTime = (time?: string) => {
  if (!time) return null;
  const [hours, minutes] = time.split(':').map(Number);
  if (!Number.isInteger(hours) || !Number.isInteger(minutes)) return null;
  return { hours, minutes };
};

const withinDailyWindow = (date: Date, startTime?: string, endTime?: string) => {
  const start = parseTime(startTime);
  const end = parseTime(endTime);
  if (!start || !end) return true;

  const minutes = date.getHours() * 60 + date.getMinutes();
  const startMinutes = start.hours * 60 + start.minutes;
  const endMinutes = end.hours * 60 + end.minutes;

  if (startMinutes <= endMinutes) {
    return minutes >= startMinutes && minutes <= endMinutes;
  }

  return minutes >= startMinutes || minutes <= endMinutes;
};

const formatSurveyDate = (date?: Date | null) => {
  if (!date) return null;
  return date.toLocaleDateString('es-VE', { day: '2-digit', month: 'short', year: 'numeric' });
};

const toDateKey = (date: Date) => date.toISOString().slice(0, 10);
const toLocalDateKey = (date: Date) => toDateKey(new Date(date.getFullYear(), date.getMonth(), date.getDate()));

const deriveSurveyAvailability = (settings: any) => {
  const now = new Date();
  const todayKey = toLocalDateKey(now);

  if (!settings?.active) {
    return { available: false, message: 'La encuesta está desactivada.' };
  }

  if (settings.startDate) {
    const startKey = toDateKey(settings.startDate);
    if (todayKey < startKey) {
      const startLabel = formatSurveyDate(settings.startDate);
      return { available: false, message: `La encuesta estará disponible desde el ${startLabel}.` };
    }
  }

  if (settings.endDate) {
    const endKey = toDateKey(settings.endDate);
    if (todayKey > endKey) {
      const endLabel = formatSurveyDate(settings.endDate);
      return { available: false, message: `La encuesta cerró el ${endLabel}.` };
    }
  }

  if (settings.dailyStartTime && settings.dailyEndTime && !withinDailyWindow(now, settings.dailyStartTime, settings.dailyEndTime)) {
    return {
      available: false,
      message: `La encuesta está disponible todos los días de ${settings.dailyStartTime} a ${settings.dailyEndTime}.`,
    };
  }

  return { available: true, message: 'La encuesta está abierta ahora mismo.' };
};

const getSurveySettings = async () => {
  let settings = await prisma.surveySettings.findFirst();
  if (!settings) {
    settings = await prisma.surveySettings.create({
      data: {
        active: true,
        durationMinutes: 5,
      },
    });
  }
  return settings;
};

publicRouter.get('/questions', async (req, res) => {
  try {
    const questions = await prisma.surveyQuestion.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
    res.json(questions);
  } catch (err) {
    console.error('[surveys.public.questions] error:', err);
    res.status(500).json({ message: 'Server error fetching survey questions' });
  }
});

publicRouter.post('/responses', async (req, res) => {
  try {
    const settings = await getSurveySettings();
    const availability = deriveSurveyAvailability(settings);
    if (!availability.available) {
      return res.status(403).json({ message: availability.message });
    }

    const cedula = typeof req.body.cedula === 'string' ? req.body.cedula.trim() : '';
    const normalizedCedula = cedula.replace(/\D/g, '');
    if (!normalizedCedula || !/^\d{6,10}$/.test(normalizedCedula)) {
      return res.status(400).json({ message: 'Cédula inválida. Proporcione una cédula válida.' });
    }

    const existingRespondent = await prisma.surveyRespondent.findUnique({ where: { cedula: normalizedCedula } });
    if (existingRespondent) {
      return res.status(409).json({ message: 'Esta cédula ya respondió la encuesta.' });
    }

    const answers = req.body.answers;
    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ message: 'Invalid responses payload' });
    }

    const rows = Object.entries(answers).map(([questionId, answer]) => ({
      questionId: Number(questionId),
      response: String(answer || ''),
    })).filter((row) => Number.isInteger(row.questionId) && row.response.trim().length > 0);

    if (rows.length === 0) {
      return res.status(400).json({ message: 'No valid answers provided' });
    }

    await prisma.surveyRespondent.create({
      data: {
        cedula: normalizedCedula,
        responses: {
          create: rows,
        },
      },
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('[surveys.public.responses] error:', err);
    res.status(500).json({ message: 'Server error saving survey responses' });
  }
});

publicRouter.get('/settings', async (req, res) => {
  try {
    const settings = await getSurveySettings();
    const availability = deriveSurveyAvailability(settings);
    res.json({
      active: settings.active,
      startDate: settings.startDate,
      endDate: settings.endDate,
      dailyStartTime: settings.dailyStartTime,
      dailyEndTime: settings.dailyEndTime,
      durationMinutes: settings.durationMinutes,
      available: availability.available,
      message: availability.message,
    });
  } catch (err) {
    console.error('[surveys.public.settings] error:', err);
    res.status(500).json({ message: 'Server error fetching survey settings' });
  }
});

publicRouter.post('/verify', async (req, res) => {
  try {
    const cedula = typeof req.body.cedula === 'string' ? req.body.cedula.trim() : '';
    const normalizedCedula = cedula.replace(/\D/g, '');
    if (!normalizedCedula || !/^\d{6,10}$/.test(normalizedCedula)) {
      return res.status(400).json({ message: 'Cédula inválida. Proporcione una cédula válida.' });
    }

    const existingRespondent = await prisma.surveyRespondent.findUnique({ where: { cedula: normalizedCedula } });
    res.json({ alreadyResponded: Boolean(existingRespondent) });
  } catch (err) {
    console.error('[surveys.public.verify] error:', err);
    res.status(500).json({ message: 'Server error verifying cédula' });
  }
});

adminRouter.get('/questions', ensureAdmin, async (req, res) => {
  try {
    const questions = await prisma.surveyQuestion.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(questions);
  } catch (err) {
    console.error('[surveys.admin.questions] error:', err);
    res.status(500).json({ message: 'Server error fetching survey questions' });
  }
});

adminRouter.post('/questions', ensureAdmin, async (req, res) => {
  try {
    const { label, type, options, order, active } = req.body as any;
    if (!label || !type) {
      return res.status(400).json({ message: 'Label and type are required' });
    }
    const created = await prisma.surveyQuestion.create({
      data: {
        label,
        type,
        options: options ?? null,
        order: Number.isInteger(order) ? order : 0,
        active: active !== false,
      },
    });
    res.json(created);
  } catch (err) {
    console.error('[surveys.admin.questions.create] error:', err);
    res.status(500).json({ message: 'Server error creating survey question' });
  }
});

adminRouter.put('/questions/:id', ensureAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ message: 'Invalid question id' });

    const { label, type, options, order, active } = req.body as any;
    const existing = await prisma.surveyQuestion.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Question not found' });

    const updated = await prisma.surveyQuestion.update({
      where: { id },
      data: {
        label: label ?? existing.label,
        type: type ?? existing.type,
        options: options !== undefined ? options : existing.options,
        order: Number.isInteger(order) ? order : existing.order,
        active: active !== undefined ? Boolean(active) : existing.active,
      },
    });
    res.json(updated);
  } catch (err) {
    console.error('[surveys.admin.questions.update] error:', err);
    res.status(500).json({ message: 'Server error updating survey question' });
  }
});

adminRouter.delete('/questions/:id', ensureAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ message: 'Invalid question id' });
    await prisma.surveyQuestion.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    console.error('[surveys.admin.questions.delete] error:', err);
    res.status(500).json({ message: 'Server error deleting survey question' });
  }
});

adminRouter.get('/settings', ensureAdmin, async (req, res) => {
  try {
    const settings = await getSurveySettings();
    const availability = deriveSurveyAvailability(settings);
    res.json({
      active: settings.active,
      startDate: settings.startDate,
      endDate: settings.endDate,
      dailyStartTime: settings.dailyStartTime,
      dailyEndTime: settings.dailyEndTime,
      durationMinutes: settings.durationMinutes,
      available: availability.available,
      message: availability.message,
    });
  } catch (err) {
    console.error('[surveys.admin.settings] error:', err);
    res.status(500).json({ message: 'Server error fetching survey settings' });
  }
});

adminRouter.put('/settings', ensureAdmin, async (req, res) => {
  try {
    const existing = await getSurveySettings();
    const { active, startDate, endDate, dailyStartTime, dailyEndTime, durationMinutes } = req.body as any;
    const updated = await prisma.surveySettings.update({
      where: { id: existing.id },
      data: {
        active: active !== undefined ? Boolean(active) : existing.active,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        dailyStartTime: dailyStartTime || null,
        dailyEndTime: dailyEndTime || null,
        durationMinutes: Number.isInteger(durationMinutes) ? durationMinutes : existing.durationMinutes,
      },
    });
    const availability = deriveSurveyAvailability(updated);
    res.json({
      active: updated.active,
      startDate: updated.startDate,
      endDate: updated.endDate,
      dailyStartTime: updated.dailyStartTime,
      dailyEndTime: updated.dailyEndTime,
      durationMinutes: updated.durationMinutes,
      available: availability.available,
      message: availability.message,
    });
  } catch (err) {
    console.error('[surveys.admin.settings.update] error:', err);
    res.status(500).json({ message: 'Server error updating survey settings' });
  }
});

adminRouter.get('/stats', ensureAdmin, async (req, res) => {
  try {
    const questions = await prisma.surveyQuestion.findMany({ orderBy: { order: 'asc' } });
    const responses = await prisma.surveyResponse.findMany();

    const stats = questions.map((question) => {
      const filtered = responses.filter((resp) => resp.questionId === question.id);
      const optionCounts: Record<string, number> = {};
      filtered.forEach((resp) => {
        optionCounts[resp.response] = (optionCounts[resp.response] || 0) + 1;
      });
      return {
        questionId: question.id,
        label: question.label,
        type: question.type,
        totalResponses: filtered.length,
        optionCounts,
        latestResponses: question.type === 'text' ? filtered.slice(-5).map((item) => item.response) : undefined,
      };
    });

    res.json({ totalResponses: responses.length, questions: stats });
  } catch (err) {
    console.error('[surveys.admin.stats] error:', err);
    res.status(500).json({ message: 'Server error fetching survey stats' });
  }
});

export { publicRouter as surveyPublicRouter, adminRouter as surveyAdminRouter };