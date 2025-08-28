const { QuizEngine } = require('./lib/quizEngine.ts');

console.log('Debugging all-a-path flips...');

// Create engine with seed 123
const engine = new QuizEngine(123);
let step = engine.start();
let questionCount = 0;

console.log('Initial state:');
console.log('Leaders:', engine.getLeaders());
console.log('Scores:', (engine as any).scores);

while (step !== "FINISHED") {
  questionCount++;
  console.log(`\n--- Question ${questionCount} (${step.phase}) ---`);
  
  // Get current state before answering
  const beforeLeaders = engine.getLeaders();
  const beforeScores = { ...(engine as any).scores };
  
  console.log('Before answering:');
  console.log('  Leaders:', beforeLeaders);
  console.log('  Scores:', beforeScores);
  
  // Pick option based on all-a-path strategy
  let optionId;
  if (step.phase === "A") {
    // Find Sovereign option
    const sovereignOption = step.item.options.find(o => 
      o.weights.primary === "Sovereign" || o.weights.secondary === "Sovereign"
    );
    optionId = sovereignOption ? sovereignOption.id : step.item.options[0].id;
    console.log(`  Picked Phase A option: ${optionId}`);
  } else {
    // Pick first pure A1 option
    const pureA1Option = step.options.find(o => o.meta?.pureA1);
    optionId = pureA1Option ? pureA1Option.id : step.options[0].id;
    console.log(`  Picked Phase B option: ${optionId}`);
  }
  
  // Answer the question
  const behavior = { latencyMs: 800, switches: 0, hoverRefsMs: 0, underClockHit: true };
  step = engine.nextStepAfterAnswer(optionId, behavior);
  
  // Get state after answering
  const afterLeaders = engine.getLeaders();
  const afterScores = { ...(engine as any).scores };
  
  console.log('After answering:');
  console.log('  Leaders:', afterLeaders);
  console.log('  Scores:', afterScores);
  
  // Check if leader changed
  if (beforeLeaders.a1 !== afterLeaders.a1) {
    console.log(`  🚨 LEADER FLIP: ${beforeLeaders.a1} → ${afterLeaders.a1}`);
  }
}

console.log('\n=== Final Result ===');
const result = engine.finalize();
console.log('Final Archetype:', result.finalArchetype);
console.log('Alt Archetype:', result.altArchetype);
console.log('Total Flips:', result.flips);
console.log('Audit:', result.audit);
