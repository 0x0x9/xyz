import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// The Google AI plugin is configured to use the GOOGLE_API_KEY environment variable by default.
export const ai = genkit({
  plugins: [googleAI()],
  logSinks: [],
  traceSinks: [],
  enableTracingAndMetrics: true,
});
