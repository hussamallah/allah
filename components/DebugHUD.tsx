"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface DebugHUDProps {
  isVisible: boolean;
  currentScores: Record<string, number>;
  currentLeaders: { a1: string; a2: string; a3: string; marginPct: number; state: string };
  triggerCounts: Record<string, number>;
  rChoiceSum: number;
  currentQuestion: number;
  // Enhanced observability props
  pureA1?: boolean;
  currentFlip?: boolean;
  currentTrigger?: string | null;
  debugFrames?: any[];
  seed?: number;
}

export function DebugHUD({
  isVisible,
  currentScores,
  currentLeaders,
  triggerCounts,
  rChoiceSum,
  currentQuestion,
  pureA1 = false,
  currentFlip = false,
  currentTrigger = null,
  debugFrames = [],
  seed = 0
}: DebugHUDProps) {
  const [showDebugDump, setShowDebugDump] = useState(false);
  const [showObservability, setShowObservability] = useState(false);

  if (!isVisible) return null;

  const archetypes = Object.keys(currentScores);
  const maxScore = Math.max(...Object.values(currentScores));
  const triggers = ["Control", "Rejection", "Delivery", "Connection", "Recognition", "Validation", "Transformation"];
  
  // Calculate R-index percentage (0-100)
  const rIndexPct = Math.min(100, (rChoiceSum / 24) * 100);

  // Enhanced observability data
  const observabilityData = {
    seed,
    question: currentQuestion,
    chosenOption: "N/A", // Would need to be passed from parent
    pureA1,
    trigger: currentTrigger,
    leaders: currentLeaders,
    flipCount: debugFrames.filter(f => f.flip).length,
    scores: currentScores,
    timestamp: new Date().toISOString()
  };

  const exportDebugData = () => {
    const dataStr = JSON.stringify(observabilityData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `debug-frame-q${currentQuestion}-seed${seed}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const logFailure = () => {
    console.error("🚨 DEBUG FRAME DUMP ON FAILURE:", observabilityData);
    console.error("📊 Full debug frames:", debugFrames);
    
    // In production, you might want to send this to a logging service
    if (process.env.NODE_ENV === 'development') {
      localStorage.setItem(`debug-failure-q${currentQuestion}-seed${seed}`, JSON.stringify(observabilityData));
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 bg-black/90 backdrop-blur-sm rounded-lg border border-gray-700 shadow-2xl">
      <Card className="bg-transparent border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-white flex items-center justify-between">
            <span>🔍 Debug HUD</span>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                Q{currentQuestion}
              </Badge>
              {seed > 0 && (
                <Badge variant="secondary" className="text-xs">
                  🌱{seed}
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Archetype Scores */}
          <div>
            <h4 className="text-xs text-gray-400 mb-2">Archetype Scores</h4>
            <div className="space-y-1">
              {archetypes.map(archetype => {
                const score = currentScores[archetype];
                const isA1 = archetype === currentLeaders.a1;
                const isA2 = archetype === currentLeaders.a2;
                const isA3 = archetype === currentLeaders.a3;
                
                let label = archetype;
                if (isA1) label += " (A1)";
                else if (isA2) label += " (A2)";
                else if (isA3) label += " (A3)";
                
                const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
                
                return (
                  <div key={archetype} className="flex items-center space-x-2">
                    <span className={`text-xs w-16 truncate ${
                      isA1 ? "text-green-400 font-bold" :
                      isA2 ? "text-yellow-400" :
                      isA3 ? "text-orange-400" :
                      "text-gray-300"
                    }`}>
                      {label}
                    </span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          isA1 ? "bg-green-500" :
                          isA2 ? "bg-yellow-500" :
                          isA3 ? "bg-orange-500" :
                          "bg-gray-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-300 w-12 text-right">
                      {score.toFixed(1)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Margin & State */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400">Margin:</span>
              <span className={`text-sm ml-2 ${
                currentLeaders.marginPct >= 6 ? "text-green-400" : "text-yellow-400"
              }`}>
                {currentLeaders.marginPct.toFixed(1)}%
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-400">State:</span>
              <span className="text-sm ml-2 text-blue-400">
                {currentLeaders.state}
              </span>
            </div>
          </div>

          {/* R-Index */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">R-Index:</span>
              <span className="text-xs text-gray-300">{rIndexPct.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${rIndexPct}%` }}
              />
            </div>
          </div>

          {/* Enhanced Observability Section */}
          <div className="border-t border-gray-700 pt-2">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs text-gray-400">🔍 Observability</h4>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-6 px-2"
                onClick={() => setShowObservability(!showObservability)}
              >
                {showObservability ? "Hide" : "Show"}
              </Button>
            </div>
            
            {showObservability && (
              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-gray-400">Pure A1:</span>
                    <span className={`ml-2 ${pureA1 ? "text-green-400" : "text-red-400"}`}>
                      {pureA1 ? "✅" : "❌"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Flip:</span>
                    <span className={`ml-2 ${currentFlip ? "text-yellow-400" : "text-gray-400"}`}>
                      {currentFlip ? "🔄" : "—"}
                    </span>
                  </div>
                </div>
                
                {currentTrigger && (
                  <div>
                    <span className="text-gray-400">Trigger:</span>
                    <span className="ml-2 text-purple-400">{currentTrigger}</span>
                  </div>
                )}
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-6 px-2"
                    onClick={exportDebugData}
                  >
                    📥 Export
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-6 px-2"
                    onClick={logFailure}
                  >
                    🚨 Log Failure
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Debug Frame Dump (Development Only) */}
          {process.env.NODE_ENV === 'development' && debugFrames.length > 0 && (
            <div className="border-t border-gray-700 pt-2">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs text-gray-400">🐛 Debug Frames</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-6 px-2"
                  onClick={() => setShowDebugDump(!showDebugDump)}
                >
                  {showDebugDump ? "Hide" : "Show"}
                </Button>
              </div>
              
              {showDebugDump && (
                <div className="max-h-32 overflow-y-auto">
                  <pre className="text-xs text-gray-300 bg-gray-800 p-2 rounded">
                    {JSON.stringify(debugFrames.slice(-3), null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Trigger Counts */}
          <div>
            <h4 className="text-xs text-gray-400 mb-2">Trigger Counts</h4>
            <div className="grid grid-cols-2 gap-1">
              {triggers.map(trigger => (
                <div key={trigger} className="flex items-center justify-between">
                  <span className="text-xs text-gray-300">{trigger}:</span>
                  <span className="text-xs text-blue-400">
                    {triggerCounts[trigger] || 0}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
