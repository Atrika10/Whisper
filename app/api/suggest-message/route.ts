import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

// Set the runtime environment to edge (optional, but efficient for AI tasks)
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // Extract the prompt from the request body
    //const { prompt } = await req.json();
   const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    // Call the Google model using the AI SDK's generateText function
    const { text } = await generateText({
      model: google('gemini-2.5-flash'), // Use a specific Gemini model
      prompt: prompt,
    });

    // Return the generated text as a JSON response
    return new Response(JSON.stringify({ response: text }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error generating text:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate text' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
