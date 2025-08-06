import rebelResults from '../data/rebelStageTestResults.json';

export interface RebelContentBlock {
  stage: string;
  mask: string;
  content: string;
}

export interface OrganizedRebelContent {
  [stage: string]: {
    [mask: string]: string;
  };
}

/**
 * Organizes raw rebel content into the proper structure
 * @param rawContent - The 25,000 words of content to organize
 * @returns Organized content ready to paste into the JSON file
 */
export function organizeRebelContent(rawContent: string): OrganizedRebelContent {
  const stages = ['instigator', 'provoker', 'disruptor', 'revolutionary', 'liberator'];
  const masks = ['instigator', 'provoker', 'disruptor', 'revolutionary', 'liberator'];
  
  const organized: OrganizedRebelContent = {};
  
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
 * @param organizedContent - The organized content from organizeRebelContent
 * @returns Complete JSON structure ready to replace the current file
 */
export function generateRebelResultsJSON(organizedContent: OrganizedRebelContent): string {
  const stages = ['instigator', 'provoker', 'disruptor', 'revolutionary', 'liberator'];
  const masks = ['instigator', 'provoker', 'disruptor', 'revolutionary', 'liberator'];
  
  let json = '{\n  "rebelResults": {\n';
  
  for (let stageIndex = 0; stageIndex < stages.length; stageIndex++) {
    const stage = stages[stageIndex];
    json += `    "${stage}": {\n`;
    
    for (let maskIndex = 0; maskIndex < masks.length; maskIndex++) {
      const mask = masks[maskIndex];
      const content = organizedContent[stage]?.[mask] || '';
      const score = `${stageIndex + 1}-${maskIndex + 1}`;
      
      // Get the existing result structure
      const existingResult = rebelResults.rebelResults[stage]?.[mask];
      
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
 * Processes raw rebel content and returns the complete JSON
 * @param rawContent - The raw content to process
 * @returns Complete JSON string ready to write to file
 */
export function processRebelContent(rawContent: string): string {
  const organized = organizeRebelContent(rawContent);
  return generateRebelResultsJSON(organized);
}

/**
 * Validates rebel content
 * @param content - The content to validate
 * @returns Validation result
 */
export function validateRebelContent(content: string): {
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
 * Creates a template for rebel content
 * @returns Template string
 */
export function createRebelContentTemplate(): string {
  return `REBEL NODE CONTENT TEMPLATE

This should contain 25,000 words of content organized into 25 different stage/mask combinations for the Rebel archetype.

The stages are: instigator, provoker, disruptor, revolutionary, liberator
The masks are: instigator, provoker, disruptor, revolutionary, liberator

Each combination should have approximately 1000 words of detailed content including:
- Current State
- Mask/Fallback
- The Loop
- What's Missing
- Climbing Up
- True Desire & Future-Self Insight
- The Cost of Staying Stuck

Format: REBEL NODE: [STAGE] | [MASK] (1000 words) followed by the content.`;
} 