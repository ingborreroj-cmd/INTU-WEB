import { Router } from 'express';
import prisma from '../prismaClient';
import { ensureAdmin } from '../middlewares/auth';

const publicRouter = Router();
const adminRouter = Router();

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

    await prisma.surveyResponse.createMany({ data: rows });
    res.json({ ok: true });
  } catch (err) {
    console.error('[surveys.public.responses] error:', err);
    res.status(500).json({ message: 'Server error saving survey responses' });
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