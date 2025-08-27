'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { MainPanel } from '@/components/MainPanel';
import { LabData, DayProgress } from '@/types/lab';
import { labDays } from '@/data/labDays';

export default function Home() {
  const [currentDay, setCurrentDay] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [progress, setProgress] = useState<Record<number, DayProgress>>({});

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('devops-labs-progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  const updateProgress = (day: number, progressData: Partial<DayProgress>) => {
    const newProgress = {
      ...progress,
      [day]: { ...progress[day], ...progressData }
    };
    setProgress(newProgress);
    localStorage.setItem('devops-labs-progress', JSON.stringify(newProgress));
  };

  const filteredDays = labDays.filter(day =>
    day.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCompleted = Object.values(progress).filter(p => p?.completed).length;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        days={filteredDays}
        currentDay={currentDay}
        onDaySelect={setCurrentDay}
        progress={progress}
      />
      <div className="flex-1 flex flex-col">
        <Header
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          totalProgress={totalCompleted}
        />
        <MainPanel
          currentDay={currentDay}
          dayData={labDays[currentDay - 1]}
          progress={progress[currentDay]}
          onProgressUpdate={(progressData) => updateProgress(currentDay, progressData)}
        />
      </div>
    </div>
  );
}