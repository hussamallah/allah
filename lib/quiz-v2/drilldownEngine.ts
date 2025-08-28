// Drilldown Engine - Generates tags for O/F lines and provides drilldown questions
// This is the V3 component for enriching reports with specific behavioral insights

import { Line, Verdict } from '../../types/quiz-v2';
import { V3_DRILLDOWN_TAGS } from './v3Config';

export interface DrilldownTag {
  tag: string;
  description: string;
  category: 'behavior' | 'pattern' | 'tendency';
  severity: 'low' | 'medium' | 'high';
}

export interface DrilldownQuestion {
  id: string;
  line: Line;
  question: string;
  options: string[];
  targetTags: string[];
  followUp: boolean;
}

export interface DrilldownRecommendation {
  line: Line;
  verdict: Verdict;
  tags: string[];
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  description: string;
}

export class DrilldownEngine {
  private tagDescriptions: Record<string, string> = {
    // Control tags
    'RoomStatus': 'Tends to check room status before committing to decisions',
    'Delegation': 'Prefers to delegate rather than take direct action',
    'SelfCheckLoop': 'Engages in self-verification cycles before proceeding',
    
    // Pace tags
    'OpenStream': 'Keeps multiple streams open without closure',
    'DeadlineElastic': 'Treats deadlines as flexible guidelines',
    'MultitaskDrift': 'Shifts between tasks without completing any',
    
    // Boundary tags
    'SoftNo': 'Expresses reluctance rather than firm refusal',
    'AfterYesRegret': 'Agrees initially then regrets the commitment',
    'CloseCostFear': 'Avoids closing options due to perceived costs',
    
    // Truth tags
    'ReasonSwitch': 'Changes reasoning mid-decision process',
    'ApprovalCheck': 'Seeks external validation for decisions',
    'EdgeCaseSpiral': 'Gets caught in edge case analysis loops',
    
    // Recognition tags
    'OpticsLead': 'Decisions driven by how they appear to others',
    'ArtifactDelay': 'Delays creating concrete outputs',
    'ChatterDrag': 'Engages in discussion without moving to action',
    
    // Bonding tags
    'Merging': 'Tends to merge options rather than choose',
    'AppeaseThenDelay': 'Agrees to appease then delays execution',
    'Availability': 'Decisions based on current availability rather than priority',
    
    // Stress tags
    'Scramble': 'Rushes decisions under pressure',
    'NarrowOverNarrow': 'Focuses on increasingly narrow aspects',
    'TimePressureLeak': 'Decision quality degrades under time pressure'
  };

  /**
   * Generate tags for a line based on verdict and behavior
   */
  generateTags(
    line: Line,
    verdict: Verdict,
    behaviorData?: {
      instabilityCount: number;
      averageLatency: number;
      switchCount: number;
      deliberationTime: number;
    }
  ): string[] {
    // Only generate tags for O and F verdicts
    if (verdict === 'C') return [];
    
    const availableTags = V3_DRILLDOWN_TAGS[line] || [];
    const selectedTags: string[] = [];
    
    // Select tags based on behavior patterns
    if (behaviorData) {
      const { instabilityCount, averageLatency, switchCount, deliberationTime } = behaviorData;
      
      // High instability → more severe tags
      if (instabilityCount >= 3) {
        selectedTags.push(availableTags[0]); // First tag (usually most severe)
      }
      
      // High latency → deliberation-related tags
      if (averageLatency > 8000) {
        const deliberationTag = availableTags.find(tag => 
          tag.includes('Delay') || tag.includes('Loop') || tag.includes('Spiral')
        );
        if (deliberationTag) selectedTags.push(deliberationTag);
      }
      
      // High switch count → pattern-related tags
      if (switchCount > 2) {
        const patternTag = availableTags.find(tag => 
          tag.includes('Switch') || tag.includes('Drift') || tag.includes('Merge')
        );
        if (patternTag) selectedTags.push(patternTag);
      }
      
      // High deliberation → tendency-related tags
      if (deliberationTime > 5000) {
        const tendencyTag = availableTags.find(tag => 
          tag.includes('Check') || tag.includes('Approve') || tag.includes('Fear')
        );
        if (tendencyTag) selectedTags.push(tendencyTag);
      }
    }
    
    // If no behavior-based tags, select default tags
    if (selectedTags.length === 0) {
      // For O verdicts, select first tag
      if (verdict === 'O') {
        selectedTags.push(availableTags[0]);
      }
      // For F verdicts, select first two tags
      else if (verdict === 'F') {
        selectedTags.push(availableTags[0]);
        if (availableTags.length > 1) {
          selectedTags.push(availableTags[1]);
        }
      }
    }
    
    // Limit to 2 tags per line
    return selectedTags.slice(0, 2);
  }

  /**
   * Determine if a line should have drilldown questions
   */
  shouldDrilldown(
    line: Line,
    verdict: Verdict,
    itemsAsked: number,
    margin: number
  ): boolean {
    // Only drilldown for O and F verdicts
    if (verdict === 'C') return false;
    
    // Drilldown if:
    // 1. After 2 items with O/F verdict, OR
    // 2. After 3+ items with low margin
    if (itemsAsked >= 2 && (verdict === 'O' || verdict === 'F')) {
      return true;
    }
    
    if (itemsAsked >= 3 && margin < 0.22) {
      return true;
    }
    
    return false;
  }

  /**
   * Get drilldown questions for a line
   */
  getDrilldownQuestions(
    line: Line,
    verdict: Verdict,
    tags: string[]
  ): DrilldownQuestion[] {
    const questions: DrilldownQuestion[] = [];
    
    // Generate questions based on line and tags
    switch (line) {
      case 'Control':
        if (tags.includes('RoomStatus')) {
          questions.push({
            id: `drill_${line}_1`,
            line,
            question: 'When making decisions, how often do you check the current situation before proceeding?',
            options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
            targetTags: ['RoomStatus'],
            followUp: false
          });
        }
        if (tags.includes('Delegation')) {
          questions.push({
            id: `drill_${line}_2`,
            line,
            question: 'How do you prefer to handle complex decisions?',
            options: ['Make them myself', 'Collaborate with others', 'Delegate to experts', 'Avoid making them'],
            targetTags: ['Delegation'],
            followUp: true
          });
        }
        break;
        
      case 'Pace':
        if (tags.includes('OpenStream')) {
          questions.push({
            id: `drill_${line}_1`,
            line,
            question: 'How do you typically manage multiple ongoing projects?',
            options: ['Focus on one until complete', 'Rotate between them', 'Keep all active', 'Let them overlap naturally'],
            targetTags: ['OpenStream'],
            followUp: false
          });
        }
        break;
        
      case 'Boundary':
        if (tags.includes('SoftNo')) {
          questions.push({
            id: `drill_${line}_1`,
            line,
            question: 'When you need to decline something, how do you typically respond?',
            options: ['Direct refusal', 'Hesitant decline', 'Conditional acceptance', 'Delayed response'],
            targetTags: ['SoftNo'],
            followUp: true
          });
        }
        break;
        
      case 'Truth':
        if (tags.includes('ReasonSwitch')) {
          questions.push({
            id: `drill_${line}_1`,
            line,
            question: 'How often do you change your reasoning during decision-making?',
            options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
            targetTags: ['ReasonSwitch'],
            followUp: false
          });
        }
        break;
        
      case 'Recognition':
        if (tags.includes('OpticsLead')) {
          questions.push({
            id: `drill_${line}_1`,
            line,
            question: 'How important is how your decisions appear to others?',
            options: ['Not important', 'Somewhat important', 'Important', 'Very important', 'Critical'],
            targetTags: ['OpticsLead'],
            followUp: true
          });
        }
        break;
        
      case 'Bonding':
        if (tags.includes('Merging')) {
          questions.push({
            id: `drill_${line}_1`,
            line,
            question: 'When faced with competing options, how do you typically respond?',
            options: ['Choose one', 'Combine them', 'Delay decision', 'Seek alternatives'],
            targetTags: ['Merging'],
            followUp: false
          });
        }
        break;
        
      case 'Stress':
        if (tags.includes('Scramble')) {
          questions.push({
            id: `drill_${line}_1`,
            line,
            question: 'Under pressure, how does your decision-making change?',
            options: ['Becomes more focused', 'Stays the same', 'Becomes rushed', 'Becomes paralyzed'],
            targetTags: ['Scramble'],
            followUp: true
          });
        }
        break;
    }
    
    return questions;
  }

  /**
   * Get comprehensive drilldown recommendation for a line
   */
  getDrilldownRecommendation(
    line: Line,
    verdict: Verdict,
    itemsAsked: number,
    margin: number,
    behaviorData?: {
      instabilityCount: number;
      averageLatency: number;
      switchCount: number;
      deliberationTime: number;
    }
  ): DrilldownRecommendation | null {
    // Check if drilldown is needed
    if (!this.shouldDrilldown(line, verdict, itemsAsked, margin)) {
      return null;
    }
    
    // Generate tags
    const tags = this.generateTags(line, verdict, behaviorData);
    
    // Calculate confidence and priority
    const confidence = this.calculateDrilldownConfidence(itemsAsked, margin, behaviorData);
    const priority = this.calculateDrilldownPriority(verdict, itemsAsked, margin);
    
    // Generate description
    const description = this.generateDrilldownDescription(line, verdict, tags, itemsAsked);
    
    return {
      line,
      verdict,
      tags,
      confidence,
      priority,
      description
    };
  }

  /**
   * Calculate confidence in drilldown recommendation
   */
  private calculateDrilldownConfidence(
    itemsAsked: number,
    margin: number,
    behaviorData?: {
      instabilityCount: number;
      averageLatency: number;
      switchCount: number;
      deliberationTime: number;
    }
  ): number {
    let confidence = 0.5; // Base confidence
    
    // More items = higher confidence
    if (itemsAsked >= 4) confidence += 0.3;
    else if (itemsAsked >= 3) confidence += 0.2;
    else if (itemsAsked >= 2) confidence += 0.1;
    
    // Lower margin = higher confidence (more uncertainty = more need for drilldown)
    if (margin < 0.12) confidence += 0.2;
    else if (margin < 0.22) confidence += 0.1;
    
    // Behavior instability = higher confidence
    if (behaviorData && behaviorData.instabilityCount > 2) {
      confidence += 0.1;
    }
    
    return Math.min(1.0, confidence);
  }

  /**
   * Calculate priority for drilldown
   */
  private calculateDrilldownPriority(
    verdict: Verdict,
    itemsAsked: number,
    margin: number
  ): 'high' | 'medium' | 'low' {
    // F verdicts get higher priority
    if (verdict === 'F') return 'high';
    
    // Low margin gets higher priority
    if (margin < 0.12) return 'high';
    if (margin < 0.22) return 'medium';
    
    // More items = higher priority
    if (itemsAsked >= 4) return 'high';
    if (itemsAsked >= 3) return 'medium';
    
    return 'low';
  }

  /**
   * Generate description for drilldown recommendation
   */
  private generateDrilldownDescription(
    line: Line,
    verdict: Verdict,
    tags: string[],
    itemsAsked: number
  ): string {
    const verdictText = verdict === 'O' ? 'offset' : 'fracture';
    const tagText = tags.length > 0 ? ` (${tags.join(', ')})` : '';
    
    return `${line} shows ${verdictText} pattern after ${itemsAsked} items${tagText}. Additional questions may provide deeper insights into the underlying behavioral patterns.`;
  }

  /**
   * Get tag descriptions for all available tags
   */
  getTagDescriptions(): Record<string, string> {
    return this.tagDescriptions;
  }

  /**
   * Get all available tags for a line
   */
  getAvailableTags(line: Line): string[] {
    return V3_DRILLDOWN_TAGS[line] || [];
  }

  /**
   * Get debug information
   */
  getDebugInfo(): {
    version: string;
    description: string;
    totalTags: number;
    linesWithTags: Line[];
    tagCategories: string[];
  } {
    const allTags = Object.values(V3_DRILLDOWN_TAGS).flat();
    const uniqueCategories = [...new Set(allTags.map(tag => {
      if (tag.includes('Status') || tag.includes('Check') || tag.includes('Loop')) return 'behavior';
      if (tag.includes('Switch') || tag.includes('Drift') || tag.includes('Merge')) return 'pattern';
      return 'tendency';
    }))];
    
    return {
      version: 'V3.0',
      description: 'Drilldown Engine for O/F line enrichment and behavioral insights',
      totalTags: allTags.length,
      linesWithTags: Object.keys(V3_DRILLDOWN_TAGS) as Line[],
      tagCategories: uniqueCategories
    };
  }
}

export default DrilldownEngine;
