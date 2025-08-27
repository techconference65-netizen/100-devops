'use client';

import { cn } from '@/lib/utils';
import { CheckCircle2, Circle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LabData, DayProgress } from '@/types/lab';

interface SidebarProps {
  days: LabData[];
  currentDay: number;
  onDaySelect: (day: number) => void;
  progress: Record<number, DayProgress>;
}

export function Sidebar({ days, currentDay, onDaySelect, progress }: SidebarProps) {
  return (
    <div className="w-80 border-r bg-card">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">Lab Days</h2>
      </div>
      
      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="p-2">
          {days.map((day) => (
            <button
              key={day.day}
              onClick={() => onDaySelect(day.day)}
              className={cn(
                'w-full text-left p-3 rounded-lg mb-1 hover:bg-accent transition-colors',
                currentDay === day.day && 'bg-accent',
                progress[day.day]?.completed && 'bg-green-50 dark:bg-green-950/20'
              )}
            >
              <div className="flex items-center space-x-3">
                {progress[day.day]?.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-1">
                    Day {day.day.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm font-medium truncate">
                    {day.title}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}