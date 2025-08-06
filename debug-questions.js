const fs = require('fs');
const path = require('path');

try {
  const filePath = path.join(__dirname, 'data', 'quizQuestions.json');
  const content = fs.readFileSync(filePath, 'utf8');
  const questions = JSON.parse(content);
  
  console.log('=== QUIZ QUESTIONS DEBUG ===');
  console.log('File path:', filePath);
  console.log('File size:', content.length, 'characters');
  console.log('Questions count:', questions.length);
  console.log('Is array:', Array.isArray(questions));
  
  console.log('\n=== FIRST QUESTION ===');
  console.log('Question:', questions[0].question);
  console.log('Options count:', questions[0].options.length);
  
  console.log('\n=== LAST QUESTION ===');
  console.log('Question:', questions[questions.length - 1].question);
  console.log('Options count:', questions[questions.length - 1].options.length);
  
  console.log('\n=== ALL QUESTIONS ===');
  questions.forEach((q, index) => {
    console.log(`${index + 1}. ${q.question.substring(0, 50)}...`);
  });
  
} catch (error) {
  console.error('Error reading quiz questions:', error);
} 