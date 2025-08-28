const { runGoldenScript } = require('./lib/sim/simulator.ts');

console.log('Testing all-a-path script...');
try {
  const result = runGoldenScript('all-a-path', 123);
  console.log('Result:', JSON.stringify(result.result, null, 2));
  console.log('Frames count:', result.frames.length);
  
  // Log each frame to see what's happening
  result.frames.forEach((frame, i) => {
    console.log(`Frame ${i + 1}: Q${frame.q} Phase ${frame.phase} Option ${frame.optionId}`);
    console.log(`  Leaders: A1=${frame.leaders.a1} A2=${frame.leaders.a2} A3=${frame.leaders.a3} Margin=${frame.leaders.marginPct}% State=${frame.leaders.state}`);
    console.log(`  Scores:`, frame.scores);
    console.log(`  Resolved Weights:`, frame.resolvedWeights);
  });
} catch (error) {
  console.error('Error:', error);
}
