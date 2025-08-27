// import { NextRequest, NextResponse } from 'next/server';
// import { readFile } from 'fs/promises';
// import path from 'path';

// export async function generateStaticParams() {
//   // Generate params for all 100 days
//   const days = [];
//   for (let i = 1; i <= 100; i++) {
//     days.push({ day: i.toString() });
//   }
//   return days;
// }

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { day: string } }
// ) {
//   try {
//     const dayNumber = parseInt(params.day);
    
//     if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 100) {
//       return new NextResponse('Invalid day number', { status: 400 });
//     }

//     const labPath = path.join(
//       process.cwd(),
//       'labs',
//       `day-${dayNumber.toString().padStart(3, '0')}`,
//       'README.md'
//     );

//     try {
//       const content = await readFile(labPath, 'utf-8');
//       return new NextResponse(content, {
//         headers: { 'Content-Type': 'text/plain' },
//       });
//     } catch (error) {
//       // Return default content if file doesn't exist
//       const defaultContent = `# Day ${dayNumber} - DevOps Lab

// ## Task Overview
// This is a placeholder for Day ${dayNumber} lab instructions.

// ## Prerequisites
// - Docker installed
// - Basic understanding of DevOps concepts

// ## Instructions
// 1. Complete the tasks listed below
// 2. Use the Docker environment to test your solutions
// 3. Make notes in the Notes section
// 4. Mark the day as complete when finished

// ## Expected Outcome
// You will learn and practice essential DevOps skills for this day's topic.

// ## Resources
// - Official documentation
// - Community guides
// - Practice environments
// `;
      
//       return new NextResponse(defaultContent, {
//         headers: { 'Content-Type': 'text/plain' },
//       });
//     }
//   } catch (error) {
//     console.error('Error loading task:', error);
//     return new NextResponse('Error loading task', { status: 500 });
//   }
// }
// app/api/task/[day]/route.ts
import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';         // ensure server runtime
export const dynamic = 'force-dynamic';  // never prerender this route
export const revalidate = 0;             // no caching for API

export async function GET(
  _req: Request,
  { params }: { params: { day: string } }
) {
  try {
    const dayNumber = Number(params.day);
    if (!Number.isInteger(dayNumber) || dayNumber < 1 || dayNumber > 100) {
      return new NextResponse('Invalid day number', { status: 400 });
    }

    // Support either day-XX or day-XXX folder naming
    const dirCandidates = [
      `day-${String(dayNumber).padStart(2, '0')}`,
      `day-${String(dayNumber).padStart(3, '0')}`,
    ];

    let content: string | null = null;
    for (const dir of dirCandidates) {
      const labPath = path.join(process.cwd(), 'labs', dir, 'README.md');
      try {
        content = await readFile(labPath, 'utf-8');
        break;
      } catch {}
    }

    if (!content) {
      content = `# Day ${dayNumber} - DevOps Lab

## Task Overview
This is a placeholder for Day ${dayNumber} lab instructions.

## Prerequisites
- Docker installed
- Basic understanding of DevOps concepts

## Instructions
1. Complete the tasks listed below
2. Use the Docker environment to test your solutions
3. Make notes in the Notes section
4. Mark the day as complete when finished

## Expected Outcome
You will learn and practice essential DevOps skills for this day's topic.

## Resources
- Official documentation
- Community guides
- Practice environments
`;
    }

    return new NextResponse(content, {
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
      status: 200,
    });
  } catch (err) {
    console.error('Error loading task:', err);
    return new NextResponse('Error loading task', { status: 500 });
  }
}
