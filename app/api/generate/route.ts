import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate a creative and engaging prompt about ${topic}. The prompt should be thought-provoking and suitable for writing or discussion.`,
      maxTokens: 100,
    });

    return NextResponse.json({ prompt: text });
  } catch (error) {
    console.error('Error generating prompt:', error);
    return NextResponse.json({ error: 'Failed to generate prompt' }, { status: 500 });
  }
}

