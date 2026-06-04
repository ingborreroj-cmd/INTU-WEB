import { Router } from 'express';
import { getProviderAdapter, Message } from '../llmProviders';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const messages: Message[] = body.history || [];
    const conversationId: string | undefined = body.conversationId;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'history array is required' });
    }

    const adapter = getProviderAdapter();
    const result = await adapter.sendMessage(messages, { conversationId });

    return res.json({ reply: result.text, raw: result.raw });
  } catch (error: any) {
    console.error('intu-bot error:', error);
    return res.status(500).json({ error: error?.message || 'Internal error' });
  }
});

export default router;