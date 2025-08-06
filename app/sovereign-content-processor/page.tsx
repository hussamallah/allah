'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SovereignContentProcessor() {
  const [content, setContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ message: string; wordCount: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProcessContent = async () => {
    if (!content.trim()) {
      setError('Please enter some content');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/process-sovereign-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process content');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  const isValid = wordCount >= 24000 && wordCount <= 26000;

  const stages = ['watcher', 'commander', 'sovereign', 'crown', 'throne'];
  const masks = ['watcher', 'commander', 'sovereign', 'crown', 'throne'];

  const createTemplate = () => {
    const template = `SOVEREIGN NODE CONTENT TEMPLATE

This should contain 25,000 words of content organized into 25 different stage/mask combinations for the Sovereign archetype.

The stages are: ${stages.join(', ')}
The masks are: ${masks.join(', ')}

Each combination should have approximately 1000 words of detailed content including:
- Current State
- Mask/Fallback
- The Loop
- What's Missing
- Climbing Up
- True Desire & Future-Self Insight
- The Cost of Staying Stuck

Format: SOVEREIGN NODE: [STAGE] | [MASK] (1000 words) followed by the content.

Example:
SOVEREIGN NODE: watcher | commander (1000 words)
[Your 1000-word content here...]

SOVEREIGN NODE: watcher | sovereign (1000 words)
[Your 1000-word content here...]

Continue for all 25 combinations...`;

    setContent(template);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">👑 Sovereign Content Processor</h1>
        <p className="text-gray-600">
          Paste your 25,000 words here and the AI will automatically organize them into 25 sovereign test results.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Content Input
              <div className="flex items-center gap-2">
                <Badge variant={isValid ? "default" : "destructive"}>
                  {wordCount.toLocaleString()} words
                </Badge>
                <Button variant="outline" size="sm" onClick={createTemplate}>
                  Create Template
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your 25,000 words of sovereign content here..."
              className="min-h-[400px] font-mono text-sm"
            />
            <div className="mt-2 text-sm text-gray-500">
              Target: 25,000 words (±1,000 words allowed)
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button 
            onClick={handleProcessContent} 
            disabled={!isValid || isProcessing}
            className="flex-1"
          >
            {isProcessing ? 'Processing...' : 'Process Sovereign Content'}
          </Button>
        </div>

        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-700">{error}</p>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <p className="text-green-700 font-semibold">{result.message}</p>
              <p className="text-green-600 mt-1">
                Processed {result.wordCount.toLocaleString()} words successfully!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 