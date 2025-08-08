'use server';
/**
 * @fileOverview A client communication AI chatbot.
 *
 * - chatWithClientBot - A function that handles the chat conversation.
 * - ChatWithClientBotInput - The input type for the chatWithClientBot function.
 * - ChatWithClientBotOutput - The return type for the chatWithClientBot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithClientBotInputSchema = z.object({
  message: z.string().describe('The user message to the bot.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({
        text: z.string()
    })),
  })).optional().describe('The chat history.'),
  systemPrompt: z.string().optional().describe('The system prompt that defines the bot\'s persona.'),
});
export type ChatWithClientBotInput = z.infer<typeof ChatWithClientBotInputSchema>;

const ChatWithClientBotOutputSchema = z.object({
  response: z.string().describe("The bot's response."),
});
export type ChatWithClientBotOutput = z.infer<typeof ChatWithClientBotOutputSchema>;

export async function chatWithClientBot(input: ChatWithClientBotInput): Promise<ChatWithClientBotOutput> {
  return clientChatFlow(input);
}

const defaultSystemPrompt = `You are a friendly and professional client communication bot for a web development agency named "heidless ai". Your role is to handle routine client inquiries, provide project updates, and gather feedback. Be helpful, concise, and maintain a positive tone. When asked for project updates, since you don't have real-time data, provide plausible and reassuring updates. For example: "The design team has just completed the wireframes, and they are now with the development team for implementation." or "We're currently running performance tests on the new feature, and everything is looking great."`;

const clientChatFlow = ai.defineFlow(
  {
    name: 'clientChatFlow',
    inputSchema: ChatWithClientBotInputSchema,
    outputSchema: ChatWithClientBotOutputSchema,
  },
  async input => {
    const {history, message, systemPrompt} = input;

    const {output} = await ai.generate({
        system: systemPrompt || defaultSystemPrompt,
        prompt: message,
        history: history,
    });

    return { response: output.text };
  }
);
