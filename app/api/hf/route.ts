import { HfInference } from '@huggingface/inference';

const apiKey = process.env.HUGGING_FACE_API_KEY;
const inference = new HfInference(apiKey);

export const dynamic = 'force-dynamic';

export async function POST(request: Request): Promise<Response> {
  try {
    if (!apiKey) {
      return new Response('Missing HUGGING_FACE_API_KEY in environment', { status: 500 });
    }

    const body = await request.json().catch(() => ({}));
    const inputText: string | undefined = body?.text;

    if (!inputText || typeof inputText !== 'string') {
      return new Response('Body must be JSON with a string field "text"', { status: 400 });
    }

    const result = await inference.summarization({
      model: 'facebook/bart-large-cnn',
      inputs: inputText,
      parameters: { max_length: 120, min_length: 30 }
    });

    return Response.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(`Hugging Face request failed: ${message}`, { status: 502 });
  }
}