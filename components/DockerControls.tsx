'use client';

import { useState } from 'react';
import { Play, Square, RotateCcw, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface DockerControlsProps {
  dayNumber: number;
  output: string;
  onOutputChange: (output: string) => void;
}

export function DockerControls({ dayNumber, output, onOutputChange }: DockerControlsProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDockerCommand = async (command: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/docker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          command,
          dayNumber,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        onOutputChange(data.output || data.message);
        if (command === 'up') setIsRunning(true);
        if (command === 'down') setIsRunning(false);
      } else {
        onOutputChange(`Error: ${data.error}`);
      }
    } catch (error) {
      onOutputChange(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 h-full">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Docker Environment</h3>
          <Badge variant={isRunning ? 'default' : 'secondary'}>
            {isRunning ? 'Running' : 'Stopped'}
          </Badge>
        </div>
        
        <div className="flex space-x-2">
          <Button
            onClick={() => handleDockerCommand('up')}
            disabled={loading || isRunning}
            className="flex items-center space-x-2"
          >
            <Play className="h-4 w-4" />
            <span>Start</span>
          </Button>
          
          <Button
            onClick={() => handleDockerCommand('down')}
            disabled={loading || !isRunning}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Square className="h-4 w-4" />
            <span>Stop</span>
          </Button>
          
          <Button
            onClick={() => handleDockerCommand('ps')}
            disabled={loading}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Status</span>
          </Button>
          
          <Button
            onClick={() => handleDockerCommand('logs')}
            disabled={loading}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <FileText className="h-4 w-4" />
            <span>Logs</span>
          </Button>
        </div>
      </Card>

      <Card className="flex-1 p-4">
        <h4 className="text-sm font-medium mb-2">Terminal Output</h4>
        <ScrollArea className="h-[400px] w-full">
          <pre className="text-xs font-mono bg-black dark:bg-gray-900 text-green-400 p-4 rounded border overflow-auto whitespace-pre-wrap">
            {output || 'No output yet. Click a button to run Docker commands.'}
          </pre>
        </ScrollArea>
      </Card>
    </div>
  );
}