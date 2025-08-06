import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { 
  processSovereignContent, 
  validateSovereignContent 
} from '@/lib/sovereignContentOrganizer';

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required and must be a string' },
        { status: 400 }
      );
    }

    // Validate the content
    const validation = validateSovereignContent(content);
    
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          error: validation.message,
          wordCount: validation.wordCount,
          expectedWords: validation.expectedWords
        },
        { status: 400 }
      );
    }

    // Process the content
    const processedJSON = processSovereignContent(content);

    // Save to the JSON file
    const filePath = join(process.cwd(), 'data', 'sovereignStageTestResults.json');
    writeFileSync(filePath, processedJSON, 'utf8');

    return NextResponse.json({
      message: `Successfully processed ${validation.wordCount} words into 25 sovereign test results!`,
      wordCount: validation.wordCount,
      filePath: 'data/sovereignStageTestResults.json'
    });

  } catch (error) {
    console.error('Error processing sovereign content:', error);
    return NextResponse.json(
      { error: 'Failed to process content' },
      { status: 500 }
    );
  }
} 