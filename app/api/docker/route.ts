import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { command, dayNumber } = await request.json();

    // Validate inputs
    if (!command || !dayNumber) {
      return NextResponse.json(
        { error: 'Command and dayNumber are required' },
        { status: 400 }
      );
    }

    // Validate command to prevent arbitrary code execution
    const allowedCommands = ['up', 'down', 'ps', 'logs'];
    if (!allowedCommands.includes(command)) {
      return NextResponse.json(
        { error: 'Command not allowed' },
        { status: 400 }
      );
    }

    // Construct safe path to lab directory
    const labPath = path.join(process.cwd(), 'labs', `day-${dayNumber.toString().padStart(3, '0')}`);
    
    // Build docker-compose command
    let dockerCommand = '';
    switch (command) {
      case 'up':
        dockerCommand = `cd "${labPath}" && docker-compose up -d`;
        break;
      case 'down':
        dockerCommand = `cd "${labPath}" && docker-compose down`;
        break;
      case 'ps':
        dockerCommand = `cd "${labPath}" && docker-compose ps`;
        break;
      case 'logs':
        dockerCommand = `cd "${labPath}" && docker-compose logs`;
        break;
    }

    // Execute command
    const { stdout, stderr } = await execAsync(dockerCommand);
    
    return NextResponse.json({
      output: stdout || stderr || `Command executed successfully: ${command}`,
      command: dockerCommand,
    });

  } catch (error) {
    console.error('Docker command error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: 'Make sure Docker is installed and the lab directory exists'
      },
      { status: 500 }
    );
  }
}