import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { 
  processPartnerContent, 
  validatePartnerContent 
} from '@/lib/partnerContentOrganizer';

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
    const validation = validatePartnerContent(content);
    
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
    const processedJSON = processPartnerContent(content);

    // Save to the JSON file
    const filePath = join(process.cwd(), 'data', 'partnerStageTestResults.json');
    writeFileSync(filePath, processedJSON, 'utf8');

    return NextResponse.json({
      message: `Successfully processed ${validation.wordCount} words into 25 partner test results!`,
      wordCount: validation.wordCount,
      filePath: 'data/partnerStageTestResults.json'
    });

  } catch (error) {
    console.error('Error processing partner content:', error);
    return NextResponse.json(
      { error: 'Failed to process content' },
      { status: 500 }
    );
  }
} 