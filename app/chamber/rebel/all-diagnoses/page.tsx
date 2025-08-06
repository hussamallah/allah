'use client';

import { useRouter } from 'next/navigation';
import { getAllRebelResults } from '@/lib/rebelStageTestUtils';

export default function RebelAllDiagnosesPage() {
  const router = useRouter();
  const allResults = getAllRebelResults();
  const allDiagnoses = Object.entries(allResults).flatMap(([dominantStage, maskResults]) =>
    Object.entries(maskResults).map(([maskStage, result]) => ({
      dominantStage,
      maskStage,
      result,
      key: `${dominantStage}-${maskStage}`
    }))
  );
  const handleViewDiagnosis = (dominantStage: string, maskStage: string) => {
    router.push(`/chamber/rebel/quiz?dominant=${dominantStage}&mask=${maskStage}`);
  };
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-red-400">
          All Rebel Diagnoses ({allDiagnoses.length})
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allDiagnoses.map(({ dominantStage, maskStage, result, key }) => (
            <div 
              key={key}
              className="bg-gray-900 border border-gray-700 p-4 rounded-lg hover:border-red-500 cursor-pointer transition-colors"
              onClick={() => handleViewDiagnosis(dominantStage, maskStage)}
            >
              <h3 className="text-lg font-bold text-white mb-2">
                {result.title}
              </h3>
              <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                {result.diagnosis}
              </p>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Stage: {dominantStage}</span>
                <span>Mask: {maskStage}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/chamber/rebel/quiz')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Take Rebel Quiz
          </button>
        </div>
      </div>
    </div>
  );
}