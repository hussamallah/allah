import { Archetype } from '@/lib/archetypes'

interface ProgressBarProps {
  stageScores: { [key: string]: number };
  progressLevels: { [key: string]: string };
  archetype: Archetype;
}

export function ProgressBar({ stageScores, progressLevels, archetype }: ProgressBarProps) {
  return (
    <div className="backdrop-blur-md border-2 rounded-2xl p-8 mb-16" style={{ borderColor: archetype.color }}>
      <h3 className="text-2xl font-bold mb-6" style={{ color: archetype.color }}>
        Stage Progress
      </h3>
      <div className="space-y-4">
        {Object.entries(stageScores).map(([stageKey, score]) => {
          const stage = archetype.stages.find((s) => s.key === stageKey);
          if (!stage) return null;
          
          return (
            <div key={stageKey} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: stage.color }}
                />
                <span className="text-gray-300">
                  {stage.label}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(score / 16) * 100}%`,
                      backgroundColor: stage.color
                    }}
                  />
                </div>
                <span className="text-sm text-gray-400 w-8">
                  {score}/16
                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                  progressLevels[stageKey] === 'stuck' ? 'bg-red-900 text-red-200' :
                  progressLevels[stageKey] === 'progressing' ? 'bg-yellow-900 text-yellow-200' :
                  'bg-green-900 text-green-200'
                }`}>
                  {progressLevels[stageKey]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 