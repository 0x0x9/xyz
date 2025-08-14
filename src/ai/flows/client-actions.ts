
'use server';

import { oria } from './oria';
import { uploadDocument } from './upload-document';
import { type OriaChatInput, type OriaChatOutput, ProjectPlanSchema, type ProjectPlan } from '@/ai/types';

export async function oriaChat(input: OriaChatInput): Promise<OriaChatOutput> {
  return oria(input);
}

export async function createManualProject(prevState: any, formData: FormData): Promise<{ success: boolean; project: ProjectPlan | null; error: string | null; }> {
    const data = {
        title: formData.get('title') as string,
        creativeBrief: formData.get('creativeBrief') as string,
    };
    
    // Basic validation
    if (!data.title || !data.creativeBrief) {
        return { success: false, project: null, error: "Le titre et le brief sont requis." };
    }

    const project: ProjectPlan = {
        id: `manual-${Date.now()}`,
        title: data.title,
        creativeBrief: data.creativeBrief,
        tasks: [],
        imagePrompts: [],
        events: []
    }
    
    const validatedProject = ProjectPlanSchema.safeParse(project);
    
    if (!validatedProject.success) {
        return { success: false, project: null, error: "Données du projet invalides." };
    }
    
    try {
        const dataUri = `data:application/json;base64,${btoa(unescape(encodeURIComponent(JSON.stringify(validatedProject.data))))}`;
        await uploadDocument({
            name: `maestro-projets/${data.title.replace(/\s/g, '_')}.json`,
            content: dataUri,
            mimeType: 'application/json'
        });
        return { success: true, project: validatedProject.data, error: null };
    } catch(e: any) {
        return { success: false, project: null, error: e.message };
    }
}
