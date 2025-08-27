'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

interface TaskViewProps {
  dayNumber: number;
}

export function TaskView({ dayNumber }: TaskViewProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTaskContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/task/${dayNumber}`);
        const data = await response.text();
        setContent(data);
      } catch (error) {
        setContent(`# Day ${dayNumber} Task\n\nTask content will be loaded here.\n\n## Instructions\n\nThis is a placeholder for the actual task instructions.`);
      } finally {
        setLoading(false);
      }
    };

    loadTaskContent();
  }, [dayNumber]);

  if (loading) {
    return (
      <Card className="h-full p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-32 w-full" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <ScrollArea className="h-full p-6">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }} />
        </div>
      </ScrollArea>
    </Card>
  );
}

function formatMarkdown(content: string): string {
  // Simple markdown to HTML conversion for demo
  return content
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^\* (.+)$/gm, '<li>$1</li>')
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|l|p|c])(.+)$/gm, '<p>$1</p>');
}