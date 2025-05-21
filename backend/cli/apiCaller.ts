import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


// Use Mstral 7B model -- OpenRouter
export async function getReadmeFromAI(prompt: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = 'mistralai/mistral-7b-instruct'; // ✅ Hardcoded to use Mistral 7B

  if (!apiKey) {
    throw new Error('❌ Missing API Key in env.');
  }

  // Endpoint for API call
  const API_URL = 'https://openrouter.ai/api/v1/chat/completions'; 

  try {
    console.log(`🚀 Calling OpenRouter with model: ${model}`);
    console.log(`🔑 Using API key: ${apiKey.slice(0, 6)}...`);
    console.log('📝 Prompt length (chars):', prompt.length);

    // API Adjustments
    const response = await axios.post(
      API_URL,
      {
        model,
        messages: [
          {
            role: 'system',
            content: 'You write professional READMEs for open source projects.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.1,
        top_p: 0.9,
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://github.com/pauls-shin/WRITEME', 
        },
      }
    );

    const choices = response.data?.choices;
    if (!choices || !Array.isArray(choices) || choices.length === 0) {
      console.error('Invalid response from OPENROUTER:', JSON.stringify(response.data, null, 2));
      throw new Error('No choices returned from OPENROUTER.');
    }

    return choices[0].message.content;
  } catch (err: any) {
    console.error('OPENROUTER -- Request failed.');
    if (err.response) {
      console.error('🔍 Response error:', JSON.stringify(err.response.data, null, 2));
    } else {
      console.error('🔍 Error message:', err.message);
    }
    throw err;
  }
}
  