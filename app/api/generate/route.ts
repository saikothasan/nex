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
        genrePrompt = 'for a fictional scenario';
        break;
      case 'non-fiction':
        genrePrompt = 'for a factual or informative response';
        break;
      case 'poetry':
        genrePrompt = 'for a poetic interpretation';
        break;
      case 'academic':
        genrePrompt = 'for an academic analysis';
        break;
      case 'business':
        genrePrompt = 'for a business-related response';
        break;
      default:
        genrePrompt = 'for a general response';
    }

    let audiencePrompt = '';
    switch (audience) {
      case 'children':
        audiencePrompt = 'suitable for children';
        break;
      case 'teenagers':
        audiencePrompt = 'appealing to teenagers';
        break;
      case 'adults':
        audiencePrompt = 'appropriate for adults';
        break;
      case 'professionals':
        audiencePrompt = 'tailored for professionals';
        break;
      default:
        audiencePrompt = 'suitable for a general audience';
    }

    let purposePrompt = '';
    switch (purpose) {
      case 'writing':
        purposePrompt = 'to generate a written piece';
        break;
      case 'brainstorming':
        purposePrompt = 'to facilitate idea generation';
        break;
      case 'discussion':
        purposePrompt = 'to initiate a discussion';
        break;
      case 'teaching':
        purposePrompt = 'to explain a concept';
        break;
      case 'presentation':
        purposePrompt = 'to create presentation content';
        break;
      default:
        purposePrompt = 'for general AI interaction';
    }

    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `As an AI prompt generator, create a prompt specifically designed for AI models to process and respond to. The prompt should be about ${topic}, ${promptLength} long, with a ${tone} tone, ${genrePrompt}, ${audiencePrompt}, and ${purposePrompt}. Ensure the prompt is clear, concise, and structured in a way that an AI can easily understand and generate a relevant response. The prompt should encourage the AI to showcase its capabilities in natural language processing, reasoning, and creative thinking within the given context. Remember, this prompt is not for human writers, but for AI models to interpret and respond to.`,
      maxTokens: 300,
    });

    return NextResponse.json({ prompt: text });
  } catch (error) {
    console.error('Error generating prompt:', error);
    return NextResponse.json({ error: 'Failed to generate prompt' }, { status: 500 });
  }
}

