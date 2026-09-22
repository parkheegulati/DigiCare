import Groq from "groq-sdk";

const SYSTEM_PROMPT = `You are DigiCare AI, an expert AI health assistant built into the DigiCare healthcare platform. 

Your role:
- Help users understand their symptoms and possible causes
- Explain medical terms, medications, dosages, and side effects clearly
- Suggest healthy lifestyle changes, diet plans, and wellness tips
- Guide users on when to see a doctor vs. manage at home
- Provide first-aid advice for common situations
- Answer questions about blood reports, vitals (BP, sugar, BMI, heart rate)

Your tone:
- Warm, clear, and empathetic — like a knowledgeable friend who is a doctor
- Avoid overly technical jargon; explain simply
- Be concise but thorough
- Use bullet points or numbered steps when listing things

IMPORTANT rules:
- Always remind users to consult a licensed physician for formal diagnoses
- Never prescribe specific prescription medications
- If symptoms sound like a medical emergency (chest pain, stroke, severe bleeding), immediately tell the user to call emergency services (102 in India)
- Do not make definitive diagnoses — only provide guidance and possibilities

Format your responses with clear headings using ** for bold when helpful.`;

let groq = null;
let history = [
  { role: "system", content: SYSTEM_PROMPT }
];

function initGroq() {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) return false;
  try {
    groq = new Groq({ 
      apiKey,
      dangerouslyAllowBrowser: true // Required for client-side usage
    });
    return true;
  } catch {
    return false;
  }
}

export function isAIConfigured() {
  const key = import.meta.env.VITE_GROQ_API_KEY;
  return !!(key && key.length > 10);
}

export function resetChat() {
  history = [{ role: "system", content: SYSTEM_PROMPT }];
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

export async function sendMessageToAI(userMessage, onRetry) {
  if (!isAIConfigured()) throw new Error('NO_API_KEY');

  if (!groq) {
    const ok = initGroq();
    if (!ok) throw new Error('NO_API_KEY');
  }

  // Add user message to history
  history.push({ role: 'user', content: userMessage });

  // Up to 2 retries for rate limit errors
  for (let attempt = 0; attempt <= 2; attempt++) {
    try {
      const completion = await groq.chat.completions.create({
        messages: history,
        model: "llama-3.3-70b-versatile",
      });

      const text = completion.choices[0]?.message?.content || "";

      // Add assistant reply to history
      history.push({ role: 'assistant', content: text });

      return text;
    } catch (err) {
      const is429 = err.status === 429 || err.message?.includes('429') || err.message?.includes('rate limit');
      if (is429 && attempt < 2) {
        // Groq usually provides a retry-after header, but in a simple implementation we'll wait a bit
        const wait = 5; 
        if (onRetry) onRetry(wait);
        await sleep(wait * 1000);
        continue;
      }
      // Remove the user message on failure
      history.pop();
      throw err;
    }
  }
}
