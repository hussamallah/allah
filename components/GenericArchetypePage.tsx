'use client';

import ArchetypeAllDiagnoses from '@/components/ArchetypeAllDiagnoses';
import { getArchetypeConfig } from '@/lib/archetypeConfigs';

interface GenericArchetypePageProps {
  archetype: string;
}

export default function GenericArchetypePage({ archetype }: GenericArchetypePageProps) {
  const config = getArchetypeConfig(archetype);
  
  if (!config) {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Configuration Error</h1>
          <p className="text-gray-300">{archetype} archetype configuration not found.</p>
        </div>
      </div>
    );
  }

  return <ArchetypeAllDiagnoses config={config} />;
} 