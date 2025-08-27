'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TaskView } from '@/components/TaskView';
import { DockerControls } from '@/components/DockerControls';
import { NotesChecklist } from '@/components/NotesChecklist';
import { LabData, DayProgress } from '@/types/lab';

interface MainPanelProps {
  currentDay: number;
  dayData: LabData;
  progress?: DayProgress;
  onProgressUpdate: (progress: Partial<DayProgress>) => void;
}

export function MainPanel({ currentDay, dayData, progress, onProgressUpdate }: MainPanelProps) {
  const [dockerOutput, setDockerOutput] = useState('');

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Day {currentDay.toString().padStart(2, '0')}</h2>
        <p className="text-xl text-muted-foreground">{dayData?.title}</p>
      </div>

      <Tabs defaultValue="task" className="h-[calc(100vh-200px)]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="task">Task Instructions</TabsTrigger>
          <TabsTrigger value="docker">Docker Environment</TabsTrigger>
          <TabsTrigger value="notes">Notes & Checklist</TabsTrigger>
        </TabsList>
        
        <TabsContent value="task" className="h-[calc(100%-60px)]">
          <TaskView dayNumber={currentDay} />
        </TabsContent>
        
        <TabsContent value="docker" className="h-[calc(100%-60px)]">
          <DockerControls
            dayNumber={currentDay}
            output={dockerOutput}
            onOutputChange={setDockerOutput}
          />
        </TabsContent>
        
        <TabsContent value="notes" className="h-[calc(100%-60px)]">
          <NotesChecklist
            progress={progress}
            onProgressUpdate={onProgressUpdate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}