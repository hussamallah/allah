import partnerResults from '../data/partnerStageTestResults.json';

export interface PartnerContentBlock {
  stage: string;
  mask: string;
  content: string;
}

export interface OrganizedPartnerContent {
  [stage: string]: {
    [mask: string]: string;
  };
}

/**
 * Organizes raw partner content into the proper structure
 * @param rawContent - The 25,000 words of content to organize
 * @returns Organized content ready to paste into the JSON file
 */
export function organizePartnerContent(rawContent: string): OrganizedPartnerContent {
  const stages = ['pleaser', 'mirror', 'mediator', 'bridge', 'connector'];
  const masks = ['pleaser', 'mirror', 'mediator', 'bridge', 'connector'];
  
  const organized: OrganizedPartnerContent = {};
  
  // Split content into chunks (assuming roughly 1000 words per result)
  const words = rawContent.split(/\s+/);
  const wordsPerResult = Math.floor(words.length / 25);
  
  let wordIndex = 0;
  
  for (let stageIndex = 0; stageIndex < stages.length; stageIndex++) {
    const stage = stages[stageIndex];
    organized[stage] = {};
    
    for (let maskIndex = 0; maskIndex < masks.length; maskIndex++) {
      const mask = masks[maskIndex];
      
      // Extract the appropriate chunk of words for this result
      const startIndex = wordIndex;
      const endIndex = Math.min(startIndex + wordsPerResult, words.length);
      const resultWords = words.slice(startIndex, endIndex);
      
      organized[stage][mask] = resultWords.join(' ');
      wordIndex = endIndex;
    }
  }
  
  return organized;
}

/**
 * Generates the JSON structure with the organized content
 * @param organizedContent - The organized content from organizePartnerContent
 * @returns Complete JSON structure ready to replace the current file
 */
export function generatePartnerResultsJSON(organizedContent: OrganizedPartnerContent): string {
  const stages = ['pleaser', 'mirror', 'mediator', 'bridge', 'connector'];
  const masks = ['pleaser', 'mirror', 'mediator', 'bridge', 'connector'];
  
  let json = '{\n  "partnerResults": {\n';
  
  for (let stageIndex = 0; stageIndex < stages.length; stageIndex++) {
    const stage = stages[stageIndex];
    json += `    "${stage}": {\n`;
    
    for (let maskIndex = 0; maskIndex < masks.length; maskIndex++) {
      const mask = masks[maskIndex];
      const content = organizedContent[stage]?.[mask] || '';
      const score = `${stageIndex + 1}-${maskIndex + 1}`;
      
      // Get the existing result structure
      const existingResult = partnerResults.partnerResults[stage]?.[mask];
      
      json += `      "${mask}": {\n`;
      json += `        "title": "${existingResult?.title || `${stage} | ${mask}`}",\n`;
      json += `        "diagnosis": "${existingResult?.diagnosis || ''}",\n`;
      json += `        "stage": "${stage}",\n`;
      json += `        "mask": "${mask}",\n`;
      json += `        "detailedContent": "${content.replace(/"/g, '\\"')}",\n`;
      json += `        "score": "${score}",\n`;
      json += `        "currentState": "${existingResult?.currentState || ''}",\n`;
      json += `        "coreIssue": "${existingResult?.coreIssue || ''}",\n`;
      json += `        "trueNeed": "${existingResult?.trueNeed || ''}",\n`;
      json += `        "warning": "${existingResult?.warning || ''}",\n`;
      json += `        "transformation": "${existingResult?.transformation || ''}",\n`;
      json += `        "ritualFocus": "${existingResult?.ritualFocus || ''}",\n`;
      json += `        "nextStage": "${existingResult?.nextStage || ''}",\n`;
      json += `        "progressPath": "${existingResult?.progressPath || ''}"\n`;
      json += `      }${maskIndex < masks.length - 1 ? ',' : ''}\n`;
    }
    
    json += `    }${stageIndex < stages.length - 1 ? ',' : ''}\n`;
  }
  
  json += '  }\n}';
  
  return json;
}

/**
 * Processes raw partner content and returns the complete JSON
 * @param rawContent - The raw content to process
 * @returns Complete JSON string ready to write to file
 */
export function processPartnerContent(rawContent: string): string {
  const organized = organizePartnerContent(rawContent);
  return generatePartnerResultsJSON(organized);
}

/**
 * Validates partner content
 * @param content - The content to validate
 * @returns Validation result
 */
export function validatePartnerContent(content: string): {
  isValid: boolean;
  wordCount: number;
  expectedWords: number;
  message: string;
} {
  const wordCount = content.split(/\s+/).length;
  const expectedWords = 25000; // 25 results * 1000 words each
  
  if (wordCount < expectedWords * 0.8) {
    return {
      isValid: false,
      wordCount,
      expectedWords,
      message: `Content too short. Expected at least ${Math.floor(expectedWords * 0.8)} words, got ${wordCount}`
    };
  }
  
  if (wordCount > expectedWords * 1.2) {
    return {
      isValid: false,
      wordCount,
      expectedWords,
      message: `Content too long. Expected at most ${Math.floor(expectedWords * 1.2)} words, got ${wordCount}`
    };
  }
  
  return {
    isValid: true,
    wordCount,
    expectedWords,
    message: `Content validated successfully. ${wordCount} words processed.`
  };
}

/**
 * Creates a template for partner content
 * @returns Template string
 */
export function createPartnerContentTemplate(): string {
  return `PARTNER NODE CONTENT TEMPLATE

This should contain 25,000 words of content organized into 25 different stage/mask combinations for the Partner archetype.

The stages are: pleaser, mirror, mediator, bridge, connector
The masks are: pleaser, mirror, mediator, bridge, connector

Each combination should have approximately 1000 words of detailed content including:
- Current State
- Mask/Fallback
- The Loop
- What's Missing
- Climbing Up
- True Desire & Future-Self Insight
- The Cost of Staying Stuck

Format: PARTNER NODE: [STAGE] | [MASK] (1000 words) followed by the content.`;
} 