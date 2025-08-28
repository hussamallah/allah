import { QuizEngineV2 } from './quizEngine';

/**
 * Simple test to verify telemetry implementation
 */
export function testTelemetry() {
  console.log('🧪 Testing QuizEngineV2 Telemetry...');
  
  try {
    // Create engine with telemetry enabled
    const engine = new QuizEngineV2();
    
    console.log('✅ Engine created with telemetry');
    
    // Check initial telemetry state
    const events = engine.getTelemetryEvents();
    console.log(`📊 Initial telemetry events: ${events.length}`);
    
    // Simulate some quiz progression
    console.log('🎯 Simulating quiz progression...');
    
    // Family Hone answer
    const phase1 = engine.handleFHAnswer('Control');
    console.log(`📝 Phase 1 result: ${phase1}`);
    
    // Check telemetry after first answer
    const eventsAfter1 = engine.getTelemetryEvents();
    console.log(`📊 Telemetry events after 1st answer: ${eventsAfter1.length}`);
    
    // Get telemetry summary
    const summary = engine.getTelemetrySummary();
    console.log('📈 Telemetry Summary:', summary);
    
    // Export telemetry data
    const exported = engine.exportTelemetry();
    console.log('📤 Exported telemetry data length:', exported.length);
    
    console.log('✅ Telemetry test completed successfully!');
    
  } catch (error) {
    console.error('❌ Telemetry test failed:', error);
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testTelemetry();
}
