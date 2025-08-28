'use client';

export default function DebugEnvPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Environment Variables Debug</h1>
      
      <div className="space-y-4">
        <div>
          <strong>NEXT_PUBLIC_SUPABASE_URL:</strong>
          <div className="mt-1 p-2 bg-gray-100 rounded font-mono text-sm">
            {supabaseUrl ? (
              <>
                ✅ Set<br/>
                <span className="text-green-600">{supabaseUrl}</span>
              </>
            ) : (
              <span className="text-red-600">❌ Missing</span>
            )}
          </div>
        </div>
        
        <div>
          <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>
          <div className="mt-1 p-2 bg-gray-100 rounded font-mono text-sm">
            {supabaseKey ? (
              <>
                ✅ Set<br/>
                <span className="text-green-600">
                  {supabaseKey.substring(0, 20)}...{supabaseKey.substring(supabaseKey.length - 10)}
                </span>
              </>
            ) : (
              <span className="text-red-600">❌ Missing</span>
            )}
          </div>
        </div>
        
        <div>
          <strong>Browser Environment:</strong>
          <div className="mt-1 p-2 bg-gray-100 rounded">
            {typeof window !== 'undefined' ? '✅ Client-side (Browser)' : '❌ Server-side'}
          </div>
        </div>
        
        <div>
          <strong>Node Environment:</strong>
          <div className="mt-1 p-2 bg-gray-100 rounded">
            {process.env.NODE_ENV || 'Not set'}
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="font-bold mb-2">What to check:</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Both environment variables should show "✅ Set"</li>
          <li>Browser Environment should show "✅ Client-side (Browser)"</li>
          <li>If any show "❌ Missing", the login won't work</li>
        </ul>
      </div>
    </div>
  );
}
