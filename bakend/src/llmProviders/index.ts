import * as gemini from './gemini';

export type Message = gemini.Message;

export function getProviderAdapter(): {
  sendMessage: (messages: Message[], opts?: any) => Promise<{ text: string; raw?: any }>
} {
  const provider = (process.env.LLM_PROVIDER || 'gemini').toLowerCase();
  
  if (provider === 'gemini') {
    return { sendMessage: gemini.sendMessage };
  }
  
  throw new Error(`Unsupported LLM provider: ${provider}`);
}