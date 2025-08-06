import equalizerResults from '../data/equalizerStageTestResults.json';

export interface EqualizerContentBlock {
  stage: string;
  mask: string;
  content: string;
}

export interface OrganizedEqualizerContent {
  [stage: string]: {
    [mask: string]: string;
  };
}

/**
 * Organizes raw equalizer content into the proper structure
 * @param rawContent - The 25,000 words of content to organize
 * @returns Organized content ready to paste into the JSON file
 */
export function organizeEqualizerContent(rawContent: string): OrganizedEqualizerContent {
  const stages = ['absorber', 'harmonizer', 'balancer', 'scale', 'justice'];
  const masks = ['absorber', 'harmonizer', 'balancer', 'scale', 'justice'];
  
  const organized: OrganizedEqualizerContent = {};
  
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
 * @param organizedContent - The organized content from organizeEqualizerContent
 * @returns Complete JSON structure ready to replace the current file
 */
export function generateEqualizerResultsJSON(organizedContent: OrganizedEqualizerContent): string {
  const stages = ['absorber', 'harmonizer', 'balancer', 'scale', 'justice'];
  const masks = ['absorber', 'harmonizer', 'balancer', 'scale', 'justice'];
  
  let json = '{\n  "equalizerResults": {\n';
  
  for (let stageIndex = 0; stageIndex < stages.length; stageIndex++) {
    const stage = stages[stageIndex];
    json += `    "${stage}": {\n`;
    
    for (let maskIndex = 0; maskIndex < masks.length; maskIndex++) {
      const mask = masks[maskIndex];
      const content = organizedContent[stage]?.[mask] || '';
      const score = `${stageIndex + 1}-${maskIndex + 1}`;
      
      // Get the existing result structure
      const existingResult = equalizerResults.equalizerResults[stage]?.[mask];
      
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
 * Processes raw equalizer content and returns the complete JSON
 * @param rawContent - The raw content to process
 * @returns Complete JSON string ready to write to file
 */
export function processEqualizerContent(rawContent: string): string {
  const organized = organizeEqualizerContent(rawContent);
  return generateEqualizerResultsJSON(organized);
}

/**
 * Validates equalizer content
 * @param content - The content to validate
 * @returns Validation result
 */
export function validateEqualizerContent(content: string): {
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
 * Creates a template for equalizer content
 * @returns Template string
 */
export function createEqualizerContentTemplate(): string {
  return `EQUALIZER NODE CONTENT TEMPLATE

This should contain 25,000 words of content organized into 25 different stage/mask combinations for the Equalizer archetype.

The stages are: absorber, harmonizer, balancer, scale, justice
The masks are: absorber, harmonizer, balancer, scale, justice

Each combination should have approximately 1000 words of detailed content including:
- Current State
- Mask/Fallback
- The Loop
- What's Missing
- Climbing Up
- True Desire & Future-Self Insight
- The Cost of Staying Stuck

Format: EQUALIZER NODE: [STAGE] | [MASK] (1000 words) followed by the content.`;
} 