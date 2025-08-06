'use client';

import { useRouter } from 'next/navigation';
import { getAllPartnerResults } from '@/lib/partnerStageTestUtils';

export default function PartnerAllDiagnosesPage() {
  const router = useRouter();
  // Get all Partner results
  const allResults = getAllPartnerResults();
  // Create a flat array of all diagnoses
  const allDiagnoses = Object.entries(allResults).flatMap(([dominantStage, maskResults]) =>
    Object.entries(maskResults).map(([maskStage, result]) => ({
      dominantStage,
      maskStage,
      result,
      key: `${dominantStage}-${maskStage}`
    }))
  );
  const handleViewDiagnosis = (dominantStage: string, maskStage: string) => {
    router.push(`/chamber/partner/quiz?dominant=${dominantStage}&mask=${maskStage}`);
  };
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-400">
          All Partner Diagnoses ({allDiagnoses.length})
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allDiagnoses.map(({ dominantStage, maskStage, result, key }) => (
            <div 
              key={key}
              className="bg-gray-900 border border-gray-700 p-4 rounded-lg hover:border-green-500 cursor-pointer transition-colors"
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
            onClick={() => router.push('/chamber/partner/quiz')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Take Partner Quiz
          </button>
        </div>
      </div>
    </div>
  );
} 