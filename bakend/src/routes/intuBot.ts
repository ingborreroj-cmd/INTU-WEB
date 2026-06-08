import { Router, Request, Response } from 'express';
import { getProviderAdapter, Message } from '../llmProviders';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const messages: Message[] = body.history || [];
    const conversationId: string | undefined = body.conversationId;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'history array is required and cannot be empty' });
    }

    const adapter = getProviderAdapter();
    
    if (!adapter) {
      return res.status(500).json({ error: 'Provider adapter could not be initialized' });
    }

    const result = await adapter.sendMessage(messages, { conversationId });

    return res.json({ reply: result.text, raw: result.raw });
  } catch (error: any) {
    return res.status(500).json({ 
      error: error?.message || 'Internal server error',
      details: error instanceof Error ? error.stack : String(error)
    });
  }
});

export default router;