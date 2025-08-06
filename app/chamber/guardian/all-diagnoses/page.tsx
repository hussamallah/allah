'use client';

import ArchetypeAllDiagnoses from '@/components/ArchetypeAllDiagnoses';
import { getArchetypeConfig } from '@/lib/archetypeConfigs';

export default function GuardianAllDiagnosesPage() {
  const config = getArchetypeConfig('guardian');
  
  if (!config) {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Configuration Error</h1>
          <p className="text-gray-300">Guardian archetype configuration not found.</p>
        </div>
      </div>
    );
  }

  return <ArchetypeAllDiagnoses config={config} />;
} 