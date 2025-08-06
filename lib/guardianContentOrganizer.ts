import guardianResults from '../data/guardianStageTestResults.json';

export interface GuardianContentBlock {
  stage: string;
  mask: string;
  content: string;
}

export interface OrganizedGuardianContent {
  [stage: string]: {
    [mask: string]: string;
  };
}

/**
 * Organizes raw guardian content into the proper structure
 * @param rawContent - The 25,000 words of content to organize
 * @returns Organized content ready to paste into the JSON file
 */
export function organizeGuardianContent(rawContent: string): OrganizedGuardianContent {
  const stages = ['shielded', 'holder', 'wall', 'gate', 'anchor'];
  const masks = ['shielded', 'holder', 'wall', 'gate', 'anchor'];
  
  const organized: OrganizedGuardianContent = {};
  
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
 * @param organizedContent - The organized content from organizeGuardianContent
 * @returns Complete JSON structure ready to replace the current file
 */
export function generateGuardianResultsJSON(organizedContent: OrganizedGuardianContent): string {
  const stages = ['shielded', 'holder', 'wall', 'gate', 'anchor'];
  const masks = ['shielded', 'holder', 'wall', 'gate', 'anchor'];
  
  let json = '{\n  "guardianResults": {\n';
  
  for (let stageIndex = 0; stageIndex < stages.length; stageIndex++) {
    const stage = stages[stageIndex];
    json += `    "${stage}": {\n`;
    
    for (let maskIndex = 0; maskIndex < masks.length; maskIndex++) {
      const mask = masks[maskIndex];
      const content = organizedContent[stage]?.[mask] || '';
      const score = `${stageIndex + 1}-${maskIndex + 1}`;
      
      // Get the existing result structure
      const existingResult = guardianResults.guardianResults[stage]?.[mask];
      
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
 * Processes raw content and returns the complete JSON structure
 * @param rawContent - The 25,000 words to process
 * @returns Complete JSON string ready to save
 */
export function processGuardianContent(rawContent: string): string {
  const organized = organizeGuardianContent(rawContent);
  return generateGuardianResultsJSON(organized);
}

/**
 * Validates that the content has enough words for all 25 results
 * @param content - The content to validate
 * @returns Validation result with details
 */
export function validateGuardianContent(content: string): {
  isValid: boolean;
  wordCount: number;
  expectedWords: number;
  message: string;
} {
  const wordCount = content.split(/\s+/).length;
  const expectedWords = 25000;
  const minWords = 7000; // Allow some flexibility
  
  return {
    isValid: wordCount >= minWords,
    wordCount,
    expectedWords,
    message: wordCount >= minWords 
      ? `Content has ${wordCount} words, which is sufficient for organizing into 25 results.`
      : `Content has ${wordCount} words, but needs at least ${minWords} words for proper distribution.`
  };
}

/**
 * Creates a template for manual content organization
 * @returns Template string with placeholders for each result
 */
export function createContentTemplate(): string {
  const stages = ['shielded', 'holder', 'wall', 'gate', 'anchor'];
  const masks = ['shielded', 'holder', 'wall', 'gate', 'anchor'];
  
  let template = 'GUARDIAN CONTENT TEMPLATE\n';
  template += '========================\n\n';
  template += 'Copy your 25,000 words below, organized by stage and mask:\n\n';
  
  for (const stage of stages) {
    template += `${stage.toUpperCase()} STAGE:\n`;
    template += '='.repeat(stage.length + 7) + '\n';
    
    for (const mask of masks) {
      template += `\n${stage} | ${mask}:\n`;
      template += '-'.repeat(stage.length + mask.length + 3) + '\n';
      template += `[PASTE YOUR 1000 WORDS FOR ${stage.toUpperCase()} | ${mask.toUpperCase()} HERE]\n\n`;
    }
    template += '\n';
  }
  
  return template;
} 