'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { DocSchema } from '@/ai/types';

// In a real application, this would fetch from a database or cloud storage.
// For this prototype, we'll return a static list of mock documents.

const mockDocs = [
  {
    id: 'doc-1',
    name: 'Designs/logo-v1.png',
    path: 'Designs/logo-v1.png',
    mimeType: 'image/png',
    size: 157286,
    createdAt: '2024-07-20T10:00:00Z',
    updatedAt: '2024-07-23T14:30:00Z',
    shareId: null,
  },
  {
    id: 'doc-2',
    name: 'Projects/maestro-launch-plan.json',
    path: 'Projects/maestro-launch-plan.json',
    mimeType: 'application/json',
    size: 8192,
    createdAt: '2024-07-21T11:20:00Z',
    updatedAt: '2024-07-22T09:00:00Z',
    shareId: 'share-abc-123',
  },
  {
    id: 'doc-3',
    name: 'Marketing/blog-post-draft.md',
    path: 'Marketing/blog-post-draft.md',
    mimeType: 'text/markdown',
    size: 4096,
    createdAt: '2024-07-22T15:00:00Z',
    updatedAt: '2024-07-23T18:45:00Z',
    shareId: null,
  },
   {
    id: 'doc-4',
    name: 'Designs/hero-image.jpg',
    path: 'Designs/hero-image.jpg',
    mimeType: 'image/jpeg',
    size: 2097152,
    createdAt: '2024-07-19T09:00:00Z',
    updatedAt: '2024-07-19T09:05:00Z',
    shareId: null,
  },
];

const listDocumentsFlow = ai.defineFlow(
  {
    name: 'listDocumentsFlow',
    inputSchema: z.void(),
    outputSchema: z.array(DocSchema),
  },
  async () => {
    // Here you would add logic to fetch documents from a real data source.
    // For now, we return the mock data.
    return mockDocs;
  }
);

export async function listDocuments() {
    return listDocumentsFlow();
}
