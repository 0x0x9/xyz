
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, ChevronDown, Check } from 'lucide-react';
import { type Job } from '@/lib/careers-data';
import { AnimatePresence, motion } from 'framer-motion';

export default function CareersClient({ openings }: { openings: Job[] }) {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const toggleJob = (id: number) => {
    setExpandedJob(prev => (prev === id ? null : id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {openings.map(job => (
        <Card key={job.id} className="glass-card overflow-hidden">
          <CardHeader className="cursor-pointer" onClick={() => toggleJob(job.id)}>
            <div className="flex justify-between items-start">
              <div>
                <Badge variant="secondary" className="mb-2">{job.department}</Badge>
                <CardTitle className="text-2xl">{job.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" />{job.type}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</span>
                </div>
              </div>
              <ChevronDown className={`h-6 w-6 text-muted-foreground transition-transform ${expandedJob === job.id ? 'rotate-180' : ''}`} />
            </div>
          </CardHeader>
          <AnimatePresence>
            {expandedJob === job.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <CardContent className="pt-4 border-t border-border">
                  <div className="space-y-6">
                    <p className="text-muted-foreground">{job.description}</p>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Responsabilités</h4>
                      <ul className="space-y-1.5">
                        {job.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-primary mt-1 shrink-0" />
                            <span className="text-muted-foreground">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                     <div>
                      <h4 className="font-semibold text-lg mb-2">Qualifications</h4>
                      <ul className="space-y-1.5">
                        {job.qualifications.map((qual, i) => (
                           <li key={i} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-primary mt-1 shrink-0" />
                            <span className="text-muted-foreground">{qual}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="lg">Postuler</Button>
                </CardFooter>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ))}
    </div>
  );
}
