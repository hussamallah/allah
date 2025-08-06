import { Archetype, Diagnosis } from '@/lib/archetypes'

interface DiagnosisBlockProps {
  diagnosis: Diagnosis;
  archetype: Archetype;
  dominantStage: string;
  maskStage: string;
}

export function DiagnosisBlock({ diagnosis, archetype, dominantStage, maskStage }: DiagnosisBlockProps) {
  const dominantStageData = archetype.stages.find((s) => s.key === dominantStage);
  const maskStageData = archetype.stages.find((s) => s.key === maskStage);

  if (!diagnosis || !dominantStageData || !maskStageData) {
    return null;
  }

  // Safety check for diagnosis structure
  if (!diagnosis.explanation) {
    return (
      <div className="backdrop-blur-md border-2 rounded-2xl p-8 mb-16 border-red-500">
        <h3 className="text-2xl font-bold mb-6 text-red-400">Error: Invalid Diagnosis Structure</h3>
        <p className="text-gray-300">The diagnosis data is not in the expected format.</p>
      </div>
    );
  }

  return (
    <div 
      className="backdrop-blur-md border-2 rounded-2xl p-8 mb-16"
      style={{ 
        background: `linear-gradient(to right, ${dominantStageData.color}30, ${dominantStageData.color}20)`,
        borderColor: `${dominantStageData.color}50`,
        boxShadow: `0 0 40px ${dominantStageData.color}30`
      }}
    >
      <h3 className="text-2xl font-bold mb-6" style={{ color: dominantStageData.color }}>
        {diagnosis.title}
      </h3>
      <p className="text-xl text-gray-300 leading-relaxed mb-8">
        {diagnosis.diagnosis}
      </p>
      
      {/* Detailed Content - Full 1000 Word Description */}
      {(diagnosis as any).detailedContent && (
        <div className="bg-black/60 rounded-lg p-6 border-l-4 mb-8" style={{ borderColor: dominantStageData.color }}>
          <h4 className="font-bold text-xl mb-4" style={{ color: dominantStageData.color }}>
            📖 Your Complete Analysis
          </h4>
          <div className="text-gray-300 leading-relaxed text-base whitespace-pre-line">
            {(diagnosis as any).detailedContent}
          </div>
        </div>
      )}
      
      {/* Quick Summary */}
      <div className="space-y-6">
        <div className="bg-black/40 rounded-lg p-4 border-l-4" style={{ borderColor: dominantStageData.color }}>
          <h4 className="font-bold text-lg mb-2" style={{ color: dominantStageData.color }}>
            Your Current State:
          </h4>
          <p className="text-gray-300">
            {diagnosis.explanation.currentState}
          </p>
        </div>
        
        <div className="bg-black/40 rounded-lg p-4 border-l-4" style={{ borderColor: maskStageData.color }}>
          <h4 className="font-bold text-lg mb-2" style={{ color: maskStageData.color }}>
            Your Mask ({maskStageData.label}):
          </h4>
          <p className="text-gray-300">
            {diagnosis.explanation.mask}
          </p>
        </div>
        
        <div className="bg-black/40 rounded-lg p-4 border-l-4" style={{ borderColor: '#fbbf24' }}>
          <h4 className="font-bold text-lg mb-2 text-yellow-400">
            ⚡ Your Directive:
          </h4>
          <p className="text-gray-300 mb-3">
            "{diagnosis.explanation.directive}"
          </p>
          <p className="text-sm text-gray-400 italic">
            <strong>Translation:</strong> {diagnosis.explanation.translation}
          </p>
        </div>
      </div>
    </div>
  );
} 