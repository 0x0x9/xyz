import { z } from 'genkit';

/**
 * @fileOverview Schemas for the generateFrame Genkit flow.
 */

export const GenerateFrameInputSchema = z.object({
  prompt: z.string().describe('A detailed description of the web page component to create.'),
  photoDataUri: z.string().optional().describe(
    "An optional image of a mockup or wireframe for inspiration, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
});

export type GenerateFrameInput = z.infer<typeof GenerateFrameInputSchema>;

export const GenerateFrameOutputSchema = z.object({
  htmlCode: z.string().describe('The generated HTML code for the component.'),
  cssCode: z.string().describe('The generated CSS code for styling the component.'),
  jsCode: z.string().optional().describe('Optional Javascript code for the component.'),
});

export type GenerateFrameOutput = z.infer<typeof GenerateFrameOutputSchema>;
