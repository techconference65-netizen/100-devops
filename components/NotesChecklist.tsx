'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DayProgress } from '@/types/lab';
import { Plus, X } from 'lucide-react';

interface NotesChecklistProps {
  progress?: DayProgress;
  onProgressUpdate: (progress: Partial<DayProgress>) => void;
}

export function NotesChecklist({ progress, onProgressUpdate }: NotesChecklistProps) {
  const [notes, setNotes] = useState(progress?.notes || '');
  const [checklist, setChecklist] = useState<Array<{ id: string; text: string; completed: boolean }>>(
    progress?.checklist || []
  );
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    setNotes(progress?.notes || '');
    setChecklist(progress?.checklist || []);
  }, [progress]);

  const handleNotesChange = (value: string) => {
    setNotes(value);
    onProgressUpdate({ notes: value });
  };

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false,
      };
      const updatedChecklist = [...checklist, newTask];
      setChecklist(updatedChecklist);
      setNewTaskText('');
      onProgressUpdate({ checklist: updatedChecklist });
    }
  };

  const toggleTask = (id: string) => {
    const updatedChecklist = checklist.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setChecklist(updatedChecklist);
    onProgressUpdate({ checklist: updatedChecklist });
  };

  const removeTask = (id: string) => {
    const updatedChecklist = checklist.filter(task => task.id !== id);
    setChecklist(updatedChecklist);
    onProgressUpdate({ checklist: updatedChecklist });
  };

  const markDayComplete = () => {
    onProgressUpdate({ completed: true });
  };

  return (
    <div className="space-y-6 h-full">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Notes</h3>
        <Textarea
          placeholder="Add your notes here..."
          value={notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          className="min-h-32"
        />
      </Card>

      <Card className="p-4 flex-1">
        <h3 className="text-lg font-semibold mb-4">Task Checklist</h3>
        
        <div className="space-y-2 mb-4">
          {checklist.map((task) => (
            <div key={task.id} className="flex items-center space-x-2 group">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <span className={`flex-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                {task.text}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeTask(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Add new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            className="flex-1 px-3 py-2 border rounded-md bg-background"
          />
          <Button onClick={addTask}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="pt-4 border-t">
          <Button
            onClick={markDayComplete}
            disabled={progress?.completed}
            className="w-full"
          >
            {progress?.completed ? 'Day Completed ✓' : 'Mark Day as Complete'}
          </Button>
        </div>
      </Card>
    </div>
  );
}