import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic, tone, length, genre, audience, purpose } = await req.json();
    
    let promptLength = '';
    switch (length) {
      case 'short':
        promptLength = 'about 50 words';
        break;
      case 'medium':
        promptLength = 'about 100 words';
        break;
      case 'long':
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
      case 'business':
        genrePrompt = 'for a business document';
        break;
      default:
        genrePrompt = '';
    }

    let audiencePrompt = '';
    switch (audience) {
      case 'children':
        audiencePrompt = 'for children';
        break;
      case 'teenagers':
        audiencePrompt = 'for teenagers';
        break;
      case 'adults':
        audiencePrompt = 'for adults';
        break;
      case 'professionals':
        audiencePrompt = 'for professionals';
        break;
      default:
        audiencePrompt = 'for a general audience';
    }

    let purposePrompt = '';
    switch (purpose) {
      case 'writing':
        purposePrompt = 'to inspire writing';
        break;
      case 'brainstorming':
        purposePrompt = 'to facilitate brainstorming';
        break;
      case 'discussion':
        purposePrompt = 'to spark discussion';
        break;
      case 'teaching':
        purposePrompt = 'for teaching purposes';
        break;
      case 'presentation':
        purposePrompt = 'for a presentation';
        break;
      default:
        purposePrompt = 'for general use';
    }

    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate a creative and engaging prompt ${genrePrompt} about ${topic}. The prompt should be ${promptLength} long, have a ${tone} tone, be suitable ${audiencePrompt}, and be designed ${purposePrompt}. The prompt should be thought-provoking and inspire creativity.`,
      maxTokens: 300,
    });

    return NextResponse.json({ prompt: text });
  } catch (error) {
    console.error('Error generating prompt:', error);
    return NextResponse.json({ error: 'Failed to generate prompt' }, { status: 500 });
  }
}

