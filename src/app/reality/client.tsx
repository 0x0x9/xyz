
'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Zap } from 'lucide-react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

// Placeholder model
function Model(props: any) {
  // This is a placeholder path. In a real app, you'd load a user-uploaded model.
  // For demo, we can use a simple shape or a pre-existing model if available.
  // Using a simple box as a placeholder.
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function RealityClient() {

  return (
    <Card className="glass-card max-w-5xl mx-auto">
      <CardContent className="p-4">
        <div className="aspect-[16/9] w-full bg-black/20 rounded-lg overflow-hidden relative">
          <Canvas dpr={[1, 2]} camera={{ fov: 45 }}>
            <Suspense fallback={null}>
              <Stage environment="city" intensity={0.6}>
                <Model />
              </Stage>
            </Suspense>
            <OrbitControls autoRotate />
          </Canvas>
           <div className="absolute top-4 left-4 flex gap-2">
                <Button variant="glass">
                    <Upload className="mr-2 h-4 w-4" />
                    Charger un modèle 3D
                </Button>
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2">
                <Button variant="glass" size="lg">
                    <Zap className="mr-2 h-4 w-4" />
                    Prévisualiser en AR
                </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
