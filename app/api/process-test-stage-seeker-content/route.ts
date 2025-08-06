import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { 
  processTestStageSeekerContent, 
  validateTestStageSeekerContent 
} from '@/lib/testStageSeekerContentOrganizer';

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
    const validation = validateTestStageSeekerContent(content);
    
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
    const processedJSON = processTestStageSeekerContent(content);

    // Save to the JSON file
    const filePath = join(process.cwd(), 'data', 'testStageSeekerStageTestResults.json');
    writeFileSync(filePath, processedJSON, 'utf8');

    return NextResponse.json({
      message: `Successfully processed ${validation.wordCount} words into 25 test stage seeker test results!`,
      wordCount: validation.wordCount,
      filePath: 'data/testStageSeekerStageTestResults.json'
    });

  } catch (error) {
    console.error('Error processing test stage seeker content:', error);
    return NextResponse.json(
      { error: 'Failed to process content' },
      { status: 500 }
    );
  }
} 