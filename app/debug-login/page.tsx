'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function DebugLoginPage() {
  const [email, setEmail] = useState('hus.1998.apr@gmail.com');
  const [password, setPassword] = useState('Killaz_123');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const testStep1 = () => {
    setStatus('Testing Supabase client creation...');
    try {
      const supabase = createClient();
      setStatus('✅ Supabase client created successfully');
      setStep(2);
    } catch (err) {
      setError(`❌ Error creating client: ${err}`);
    }
  };

  const testStep2 = () => {
    setStatus('Testing sign in...');
    const supabase = createClient();
    
    supabase.auth.signInWithPassword({
      email,
      password,
    }).then(({ data, error }) => {
      if (error) {
        setError(`❌ Sign in error: ${error.message}`);
      } else {
        setStatus('✅ Sign in successful!');
        setStep(3);
      }
    }).catch((err) => {
      setError(`❌ Unexpected error: ${err}`);
    });
  };

  const testStep3 = () => {
    setStatus('Testing session...');
    const supabase = createClient();
    
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        setError(`❌ Session error: ${error.message}`);
      } else if (data.session) {
        setStatus(`✅ Session found for user: ${data.session.user.email}`);
      } else {
        setStatus('❌ No session found');
      }
    });
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Debug Login Test</h1>
      
      <div className="mb-6">
        <label className="block mb-2">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="mb-6">
        <label className="block mb-2">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-2 mb-6">
        <button
          onClick={testStep1}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Step 1: Test Client Creation
        </button>
        
        {step >= 2 && (
          <button
            onClick={testStep2}
            className="w-full p-2 bg-green-500 text-white rounded"
          >
            Step 2: Test Sign In
          </button>
        )}
        
        {step >= 3 && (
          <button
            onClick={testStep3}
            className="w-full p-2 bg-purple-500 text-white rounded"
          >
            Step 3: Test Session
          </button>
        )}
      </div>

      <div className="mb-4">
        <strong>Status:</strong>
        <div className="mt-1 p-2 bg-gray-100 rounded">{status || 'Ready to test'}</div>
      </div>

      {error && (
        <div className="mb-4">
          <strong>Error:</strong>
          <div className="mt-1 p-2 bg-red-100 text-red-700 rounded">{error}</div>
        </div>
      )}

      <div className="text-sm text-gray-600">
        <p>This page will help us identify exactly where the login is failing.</p>
        <p>Click each step in order to test the authentication flow.</p>
      </div>
    </div>
  );
}
