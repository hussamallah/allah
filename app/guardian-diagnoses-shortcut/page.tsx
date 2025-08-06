'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GuardianDiagnosesShortcut() {
  const router = useRouter();

  useEffect(() => {
    router.push('/chamber/guardian/all-diagnoses');
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg">Redirecting to Guardian Diagnoses...</p>
      </div>
    </div>
  );
} 