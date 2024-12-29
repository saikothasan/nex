import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic, tone, length, genre } = await req.json();
    
    let promptLength = '';
    switch (length) {
      case 'short':
        promptLength = 'about 50 words';
        break;
      case 'medium':
        promptLength = 'about 100 words';
        break;
      case'long':
        promptLength = 'about 200 words';
        break;
      default:
        promptLength = 'about 100 words';
    }

    let genrePrompt = '';
    switch (genre) {
      case 'fiction':
        genrePrompt = 'for a fictional story';
        break;
      case 'non-fiction':
        genrePrompt = 'for a non-fiction article';
        break;
      case 'poetry':
        genrePrompt = 'for a poem';
        break;
      case 'academic':
        genrePrompt = 'for an academic paper';
        break;
      default:
        genrePrompt = '';
    }

    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate a creative and engaging prompt ${genrePrompt} about ${topic}. The prompt should be ${promptLength} long and have a ${tone} tone. The prompt should be thought-provoking and suitable for writing or discussion.`,
      maxTokens: 300,
    });

    return NextResponse.json({ prompt: text });
  } catch (error) {
    console.error('Error generating prompt:', error);
    return NextResponse.json({ error: 'Failed to generate prompt' }, { status: 500 });
  }
}

