// GroundZero v3 Question Bank Integration
// Abstract content interface for loading and managing quiz questions

import { Line, Face, QuizQuestion } from '../../types/quiz-v2';
import { contentIDManager, getFHContentID, getFaceTriadID, getFaceDuelID, getLinesBaseID, getLinesTiebreakerID, getLinesDuelID } from './contentMapping';

// Content interface for GroundZero questions
export interface GroundZeroContent {
  id: string;
  type: 'FH' | 'FACE_TRIAD' | 'FACE_DUEL' | 'LINES_BASE' | 'LINES_TIEBREAKER' | 'LINES_DUEL' | 'MISC';
  family?: Line;
  face?: Face;
  content: {
    question: string;
    options: string[];
    metadata?: Record<string, any>;
  };
  fallback?: string;
}

// Question bank configuration
export interface QuestionBankConfig {
  contentPath?: string;
  enableFallbacks: boolean;
  cacheEnabled: boolean;
  maxCacheSize: number;
}

/**
 * Question Bank Manager for GroundZero v3
 * Handles content loading, fallbacks, and validation
 */
export class QuestionBankManager {
  private static instance: QuestionBankManager;
  private contentCache: Map<string, GroundZeroContent> = new Map();
  private config: QuestionBankConfig;
  private fallbackContent: Map<string, GroundZeroContent> = new Map();

  private constructor(config: QuestionBankConfig = {
    enableFallbacks: true,
    cacheEnabled: true,
    maxCacheSize: 100
  }) {
    this.config = config;
    this.initializeFallbacks();
  }

  static getInstance(config?: QuestionBankConfig): QuestionBankManager {
    if (!QuestionBankManager.instance) {
      QuestionBankManager.instance = new QuestionBankManager(config);
    }
    return QuestionBankManager.instance;
  }

  /**
   * Initialize fallback content for all question types
   */
  private initializeFallbacks(): void {
    if (!this.config.enableFallbacks) return;

    // FH fallbacks
    this.fallbackContent.set('FH_Q0', {
      id: 'FH_Q0',
      type: 'FH',
      content: {
        question: 'Which of these approaches resonates most with you?',
        options: ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress']
      }
    });

    // Face triad fallbacks
    const families: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    families.forEach(family => {
      const triadID = getFaceTriadID(family);
      if (triadID) {
        this.fallbackContent.set(triadID, {
          id: triadID,
          type: 'FACE_TRIAD',
          family,
          content: {
            question: `Within ${family}, which approach feels most natural?`,
            options: ['Option A', 'Option B', 'Option C']
          }
        });
      }
    });

    // Lines base fallbacks
    families.forEach(family => {
      [1, 2].forEach(itemNum => {
        const baseID = getLinesBaseID(family, itemNum as 1 | 2);
        if (baseID) {
          this.fallbackContent.set(baseID, {
            id: baseID,
            type: 'LINES_BASE',
            family,
            content: {
              question: `How do you typically approach ${family} situations?`,
              options: ['Option A', 'Option B', 'Option C']
            }
          });
        }
      });
    });
  }

  /**
   * Load content by ID with fallback support
   */
  async loadContent(contentID: string): Promise<GroundZeroContent> {
    // Check cache first
    if (this.config.cacheEnabled && this.contentCache.has(contentID)) {
      return this.contentCache.get(contentID)!;
    }

    // Try to load from external source (placeholder for now)
    let content: GroundZeroContent | null = null;
    
    try {
      content = await this.loadFromExternalSource(contentID);
    } catch (error) {
      console.warn(`Failed to load content for ${contentID}:`, error);
    }

    // Use fallback if external loading failed
    if (!content && this.config.enableFallbacks) {
      content = this.getFallbackContent(contentID);
    }

    if (!content) {
      throw new Error(`No content available for ${contentID}`);
    }

    // Cache the content
    if (this.config.cacheEnabled) {
      this.cacheContent(contentID, content);
    }

    return content;
  }

  /**
   * Load content from external source (placeholder implementation)
   */
  private async loadFromExternalSource(contentID: string): Promise<GroundZeroContent | null> {
    // This would integrate with actual GroundZero content system
    // For now, return null to trigger fallbacks
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 10));
    
    return null;
  }

  /**
   * Get fallback content for a content ID
   */
  private getFallbackContent(contentID: string): GroundZeroContent | null {
    return this.fallbackContent.get(contentID) || null;
  }

  /**
   * Cache content with size management
   */
  private cacheContent(contentID: string, content: GroundZeroContent): void {
    if (this.contentCache.size >= this.config.maxCacheSize) {
      // Remove oldest entry (simple FIFO)
      const firstKey = this.contentCache.keys().next().value;
      this.contentCache.delete(firstKey);
    }
    
    this.contentCache.set(contentID, content);
  }

  /**
   * Get Family Hone question for a specific screen
   */
  async getFHQuestion(screenNumber: number): Promise<QuizQuestion> {
    const contentID = getFHContentID(screenNumber);
    if (!contentID) {
      throw new Error(`No content ID available for FH screen: ${screenNumber}`);
    }
    const content = await this.loadContent(contentID);
    
    return {
      id: contentID,
      stage: 'FH',
      prompt: content.content.question,
      options: content.content.options.map((option: string, index: number) => ({
        id: `option_${index}`,
        label: option
      })),
      meta: {
        type: 'FH',
        screen: screenNumber,
        contentID
      }
    };
  }

  /**
   * Get Face Triad question for a family
   */
  async getFaceTriadQuestion(family: Line): Promise<QuizQuestion> {
    const contentID = getFaceTriadID(family);
    if (!contentID) {
      throw new Error(`No content ID available for face triad of family: ${family}`);
    }
    const content = await this.loadContent(contentID);
    
    return {
      id: contentID,
      stage: 'FACE_TRIAD',
      prompt: content.content.question,
      options: content.content.options.map((option: string, index: number) => ({
        id: `option_${index}`,
        label: option
      })),
      meta: {
        type: 'FACE_TRIAD',
        family,
        contentID
      }
    };
  }

  /**
   * Get Face Duel question for a family and duel number
   */
  async getFaceDuelQuestion(family: Line, duelNumber: 1 | 2 | 3): Promise<QuizQuestion> {
    const contentID = getFaceDuelID(family, duelNumber);
    if (!contentID) {
      throw new Error(`No content ID available for face duel ${duelNumber} of family: ${family}`);
    }
    const content = await this.loadContent(contentID);
    
    return {
      id: contentID,
      stage: 'FACE_DUEL',
      prompt: content.content.question,
      options: content.content.options.map((option: string, index: number) => ({
        id: `option_${index}`,
        label: option
      })),
      meta: {
        type: 'FACE_DUEL',
        family,
        duelNumber,
        contentID
      }
    };
  }

  /**
   * Get Lines Base question for a family and item number
   */
  async getLinesBaseQuestion(family: Line, itemNumber: 1 | 2): Promise<QuizQuestion> {
    const contentID = getLinesBaseID(family, itemNumber);
    if (!contentID) {
      throw new Error(`No content ID available for lines base ${itemNumber} of family: ${family}`);
    }
    const content = await this.loadContent(contentID);
    
    return {
      id: contentID,
      stage: 'LINES_BASE',
      prompt: content.content.question,
      options: content.content.options.map((option: string, index: number) => ({
        id: `option_${index}`,
        label: option
      })),
      meta: {
        type: 'LINES_BASE',
        family,
        itemNumber,
        contentID
      }
    };
  }

  /**
   * Get Lines Tiebreaker question for a family and TB number
   */
  async getLinesTiebreakerQuestion(family: Line, tbNumber: 1 | 2): Promise<QuizQuestion> {
    const contentID = getLinesTiebreakerID(family, tbNumber);
    if (!contentID) {
      throw new Error(`No content ID available for lines tiebreaker ${tbNumber} of family: ${family}`);
    }
    const content = await this.loadContent(contentID);
    
    return {
      id: contentID,
      stage: 'LINES_TIEBREAKER',
      prompt: content.content.question,
      options: content.content.options.map((option: string, index: number) => ({
        id: `option_${index}`,
        label: option
      })),
      meta: {
        type: 'LINES_TIEBREAKER',
        family,
        tbNumber,
        contentID
      }
    };
  }

  /**
   * Get Lines Duel question for a family and duel number
   */
  async getLinesDuelQuestion(family: Line, duelNumber: 1 | 2 | 3): Promise<QuizQuestion> {
    const contentID = getLinesDuelID(family, duelNumber);
    if (!contentID) {
      throw new Error(`No content ID available for lines duel ${duelNumber} of family: ${family}`);
    }
    const content = await this.loadContent(contentID);
    
    return {
      id: contentID,
      stage: 'LINES_DUEL',
      prompt: content.content.question,
      options: content.content.options.map((option: string, index: number) => ({
        id: `option_${index}`,
        label: option
      })),
      meta: {
        type: 'LINES_DUEL',
        family,
        duelNumber,
        contentID
      }
    };
  }

  /**
   * Preload content for a specific family
   */
  async preloadFamilyContent(family: Line): Promise<void> {
    const contentIDs = contentIDManager.getFamilyContentIDs(family);
    
    const loadPromises = [
      // Load FH content
      ...contentIDs.fh.slice(0, 5).map(id => this.loadContent(id)), // Load first 5 FH screens
      // Load face content
      this.loadContent(contentIDs.face.triad),
      ...contentIDs.face.duels.map(id => this.loadContent(id)),
      // Load lines content
      ...contentIDs.lines.base.map(id => this.loadContent(id)),
      ...contentIDs.lines.tiebreakers.map(id => this.loadContent(id))
    ];

    try {
      await Promise.all(loadPromises);
      console.log(`Preloaded content for ${family}`);
    } catch (error) {
      console.warn(`Failed to preload some content for ${family}:`, error);
    }
  }

  /**
   * Validate content structure
   */
  validateContent(content: GroundZeroContent): boolean {
    if (!content.id || !content.type || !content.content) {
      return false;
    }

    if (!content.content.question || !Array.isArray(content.content.options)) {
      return false;
    }

    if (content.content.options.length < 2) {
      return false;
    }

    return true;
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    cacheSize: number;
    maxCacheSize: number;
    hitRate: number;
    totalRequests: number;
  } {
    return {
      cacheSize: this.contentCache.size,
      maxCacheSize: this.config.maxCacheSize,
      hitRate: 0, // TODO: Implement hit rate tracking
      totalRequests: 0 // TODO: Implement request tracking
    };
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.contentCache.clear();
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<QuestionBankConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    if (!this.config.cacheEnabled) {
      this.clearCache();
    }
  }

  /**
   * Get debug information
   */
  getDebugInfo(): {
    config: QuestionBankConfig;
    cacheStats: ReturnType<typeof this.getCacheStats>;
    fallbackCount: number;
    contentIDManager: ReturnType<typeof contentIDManager.getDebugInfo>;
  } {
    return {
      config: this.config,
      cacheStats: this.getCacheStats(),
      fallbackCount: this.fallbackContent.size,
      contentIDManager: contentIDManager.getDebugInfo()
    };
  }
}

// Export singleton instance
export const questionBankManager = QuestionBankManager.getInstance();

// Export utility functions
export const getFHQuestion = (screenNumber: number) => questionBankManager.getFHQuestion(screenNumber);
export const getFaceTriadQuestion = (family: Line) => questionBankManager.getFaceTriadQuestion(family);
export const getFaceDuelQuestion = (family: Line, duelNumber: 1 | 2 | 3) => questionBankManager.getFaceDuelQuestion(family, duelNumber);
export const getLinesBaseQuestion = (family: Line, itemNumber: 1 | 2) => questionBankManager.getLinesBaseQuestion(family, itemNumber);
export const getLinesTiebreakerQuestion = (family: Line, tbNumber: 1 | 2) => questionBankManager.getLinesTiebreakerQuestion(family, tbNumber);
export const getLinesDuelQuestion = (family: Line, duelNumber: 1 | 2 | 3) => questionBankManager.getLinesDuelQuestion(family, duelNumber);
export const preloadFamilyContent = (family: Line) => questionBankManager.preloadFamilyContent(family);

export default QuestionBankManager;
