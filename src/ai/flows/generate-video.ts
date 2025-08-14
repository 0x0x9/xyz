'use server';
/**
 * @fileOverview An AI flow for generating video from text or image prompts.
 *
 * - generateVideo - A function that handles video generation using Google's Veo model.
 * - GenerateVideoInput - The input type for the generateVideo function.
 * - GenerateVideoOutput - The return type for the generateVideo function.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';
import * as fs from 'fs';
import { Readable } from 'stream';
import type { MediaPart } from 'genkit';

// Define Zod schemas for input and output
const GenerateVideoInputSchema = z.object({
  prompt: z.string().describe("A text description of the video to generate."),
  photoDataUri: z.string().optional().describe("An optional starting image for image-to-video generation, as a data URI."),
  durationSeconds: z.number().optional().default(5).describe("The duration of the video in seconds."),
  aspectRatio: z.enum(['16:9', '9:16']).optional().default('16:9').describe("The aspect ratio of the video."),
});
export type GenerateVideoInput = z.infer<typeof GenerateVideoInputSchema>;

const GenerateVideoOutputSchema = z.object({
  videoDataUri: z.string().describe("The generated video as a data URI."),
  contentType: z.string().describe("The MIME type of the video, e.g., 'video/mp4'."),
});
export type GenerateVideoOutput = z.infer<typeof GenerateVideoOutputSchema>;

// Helper function to download the video and convert to data URI
async function processVideo(videoPart: MediaPart): Promise<{ videoDataUri: string, contentType: string }> {
  if (!videoPart.media?.url) {
    throw new Error('No video URL returned from the model.');
  }

  // The API returns a URL that requires an API key for access.
  const fetch = (await import('node-fetch')).default;
  const videoUrlWithKey = `${videoPart.media.url}&key=${process.env.GEMINI_API_KEY}`;
  
  const videoResponse = await fetch(videoUrlWithKey);
  if (!videoResponse.ok || !videoResponse.body) {
    throw new Error(`Failed to download video: ${videoResponse.statusText}`);
  }

  // Read the video into a buffer
  const videoBuffer = await videoResponse.buffer();
  const base64Video = videoBuffer.toString('base64');
  const contentType = videoPart.media.contentType || 'video/mp4';

  return {
    videoDataUri: `data:${contentType};base64,${base64Video}`,
    contentType: contentType,
  };
}


const generateVideoFlow = ai.defineFlow(
  {
    name: 'generateVideoFlow',
    inputSchema: GenerateVideoInputSchema,
    outputSchema: GenerateVideoOutputSchema,
  },
  async (input) => {
    
    // Construct the prompt, which can be text or a mix of text and image
    const promptParts: ({ text: string } | { media: { url: string; contentType: string } })[] = [{ text: input.prompt }];
    if (input.photoDataUri) {
        const mimeType = input.photoDataUri.match(/data:(.*);base64,/)?.[1] || 'image/jpeg';
        promptParts.push({ media: { url: input.photoDataUri, contentType: mimeType } });
    }
      
    // Start the video generation operation
    let { operation } = await ai.generate({
      model: googleAI.model('veo-2.0-generate-001'),
      prompt: promptParts,
      config: {
        durationSeconds: input.durationSeconds,
        aspectRatio: input.aspectRatio,
      },
    });

    if (!operation) {
      throw new Error('Expected the model to return a long-running operation.');
    }

    // Poll for completion
    while (!operation.done) {
      // Wait for 5 seconds before checking again.
      await new Promise((resolve) => setTimeout(resolve, 5000));
      operation = await ai.checkOperation(operation);
    }

    if (operation.error) {
      throw new Error(`Video generation failed: ${operation.error.message}`);
    }

    const videoPart = operation.output?.message?.content.find((p) => !!p.media);
    if (!videoPart) {
      throw new Error('Failed to find the generated video in the operation result.');
    }

    // Download and convert the video
    return await processVideo(videoPart);
  }
);


export async function generateVideo(input: GenerateVideoInput): Promise<GenerateVideoOutput> {
  return generateVideoFlow(input);
}
