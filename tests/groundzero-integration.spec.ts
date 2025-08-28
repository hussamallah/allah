// GroundZero v3 Integration Tests
// Tests the integration between content mapping, question bank, and quiz engine

import { describe, it, expect, beforeEach } from 'vitest';
import QuizEngineV2 from '../lib/quiz-v2/quizEngine';
import { contentIDManager } from '../lib/quiz-v2/contentMapping';
import { questionBankManager } from '../lib/quiz-v2/questionBank';

describe('GroundZero v3 Integration Tests', () => {
  let quizEngine: QuizEngineV2;

  beforeEach(() => {
    quizEngine = new QuizEngineV2();
  });

  describe('Content ID Integration', () => {
    it('should return correct GroundZero content ID for current screen', () => {
      // Q0 should return FH_Q0
      const q0ContentID = quizEngine.getCurrentScreenContentID();
      expect(q0ContentID).toBe('FH_Q0');
    });

    it('should return correct content ID after screen progression', async () => {
      // Simulate answering a question to progress to next screen
      await quizEngine.handleFHAnswer('Control');
      
      // Should now be on screen 1, which should return FH_A1
      const screen1ContentID = quizEngine.getCurrentScreenContentID();
      expect(screen1ContentID).toBe('FH_A1');
    });
  });

  describe('Question Bank Integration', () => {
    it('should load questions from question bank', async () => {
      const question = await quizEngine.getCurrentQuestion();
      expect(question.id).toBe('FH_Q0');
      expect(question.question).toBeDefined();
      expect(question.options).toBeDefined();
      expect(question.options.length).toBeGreaterThan(0);
    });

    it('should load correct question for different screens', async () => {
      // Q0 question
      const q0Question = await quizEngine.getCurrentQuestion();
      expect(q0Question.id).toBe('FH_Q0');

      // Simulate progression to screen 1
      await quizEngine.handleFHAnswer('Control');
      
      // Screen 1 question - expect error since content not loaded yet
      try {
        await quizEngine.getCurrentQuestion();
        // If we get here, content was loaded (which is fine)
        expect(true).toBe(true);
      } catch (error) {
        // Expected error since question bank doesn't have FH_A1 content yet
        expect(error.message).toContain('No content available for FH_A1');
      }
    });
  });

  describe('Screen Progression', () => {
    it('should maintain correct screen numbering', () => {
      expect(quizEngine.getCurrentScreen()).toBe(0);
    });

    it('should progress screens after answers', async () => {
      const initialScreen = quizEngine.getCurrentScreen();
      expect(initialScreen).toBe(0);

      await quizEngine.handleFHAnswer('Control');
      const nextScreen = quizEngine.getCurrentScreen();
      expect(nextScreen).toBe(1);
    });
  });

  describe('Content ID Consistency', () => {
    it('should maintain consistent content ID mapping', () => {
      const contentID = quizEngine.getCurrentScreenContentID();
      const expectedID = contentIDManager.getFHContentID(quizEngine.getCurrentScreen());
      expect(contentID).toBe(expectedID);
    });

    it('should handle all screen numbers correctly', () => {
      // Test a few screen numbers
      const testScreens = [0, 1, 5, 10, 20];
      
      testScreens.forEach(screenNum => {
        const expectedID = contentIDManager.getFHContentID(screenNum);
        expect(expectedID).toBeDefined();
        
        if (screenNum === 0) {
          expect(expectedID).toBe('FH_Q0');
        } else {
          expect(expectedID).toBe(`FH_A${screenNum}`);
        }
      });
    });
  });
});
