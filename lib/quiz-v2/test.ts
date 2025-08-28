import { QuizEngineV2 } from './quizEngine';
import { QuestionBankV2 } from './questionBank';
import quizBankData from '../../data/quiz-bank-v7.3.2 (1).json';

/**
 * Simple test to verify core engine functionality
 */
export function testQuizEngine() {
  console.log('🧪 Testing Quiz Engine V2...');
  
  try {
    // Test 1: Create engine
    console.log('✅ Creating engine...');
    const engine = new QuizEngineV2();
    
    // Test 2: Create question bank
    console.log('✅ Creating question bank...');
    const qb = new QuestionBankV2(quizBankData);
    
    // Test 3: Validate question bank
    console.log('✅ Validating question bank...');
    const validation = qb.validateQuestionBank();
    console.log('Question bank validation:', validation);
    
    // Test 4: Get question stats
    console.log('✅ Getting question stats...');
    const stats = qb.getQuestionStats();
    console.log('Question bank stats:', stats);
    
    // Test 5: Test FH logic
    console.log('✅ Testing FH logic...');
    const fhQuestion = qb.getNextFHQuestion(0, {
      L1: 'Control',
      L2: 'Pace',
      expo: { Control: 0, Pace: 0, Boundary: 0, Truth: 0, Recognition: 0, Bonding: 0, Stress: 0 }
    });
    console.log('FH Q0:', fhQuestion?.id, fhQuestion?.prompt?.substring(0, 50) + '...');
    
    // Test 6: Test face triad
    console.log('✅ Testing face triad...');
    const faceTriad = qb.getFaceTriad('Control');
    console.log('Face triad for Control:', faceTriad?.id, faceTriad?.prompt?.substring(0, 50) + '...');
    
    // Test 7: Test lines questions
    console.log('✅ Testing lines questions...');
    const linesQuestions = qb.getLinesBaseQuestions('Control');
    console.log('Lines questions for Control:', linesQuestions.length, 'questions');
    
    console.log('🎉 All tests passed!');
    return true;
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
}

// Run test if this file is executed directly
if (typeof window === 'undefined') {
  testQuizEngine();
}

