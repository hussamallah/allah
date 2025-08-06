'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PartnerContentProcessor() {
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stages = ['pleaser', 'supporter', 'mediator', 'catalyst', 'orchestrator'];
  const masks = ['pleaser', 'supporter', 'mediator', 'catalyst', 'orchestrator'];

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setWordCount(newContent.split(/\s+/).filter(word => word.length > 0).length);
    setError(null);
    setResult(null);
  };

  const validateContent = () => {
    const minWords = 7000;
    if (wordCount < minWords) {
      setError(`Content needs at least ${minWords} words. Current: ${wordCount} words.`);
      return false;
    }
    return true;
  };

  const processContent = async () => {
    if (!validateContent()) return;

    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/process-partner-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error('Failed to process content');
      }

      const data = await response.json();
      setResult(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const createTemplate = () => {
    let template = 'PARTNER CONTENT TEMPLATE\n';
    template += '========================\n\n';
    template += 'Copy your 25,000 words below, organized by stage and mask:\n\n';
    
    for (const stage of stages) {
      template += `${stage.toUpperCase()} STAGE:\n`;
      template += '='.repeat(stage.length + 7) + '\n';
      
      for (const mask of masks) {
        template += `\n${stage} | ${mask}:\n`;
        template += '-'.repeat(stage.length + mask.length + 3) + '\n';
        template += `[PASTE YOUR 1000 WORDS FOR ${stage.toUpperCase()} | ${mask.toUpperCase()} HERE]\n\n`;
      }
      template += '\n';
    }
    
    setContent(template);
    setWordCount(template.split(/\s+/).filter(word => word.length > 0).length);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🤝 Partner Content Processor</h1>
        <p className="text-gray-600">
          Paste your 25,000 words here and the AI will automatically organize them into 25 partner test results.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Input */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Content Input</CardTitle>
              <CardDescription>
                Paste your 25,000 words here. The system will automatically distribute them across 25 results.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant={wordCount >= 7000 ? "default" : "destructive"}>
                    {wordCount} words
                  </Badge>
                  <div className="text-sm text-gray-500">
                    Need: 7,000+ words
                  </div>
                </div>
                
                <Textarea
                  value={content}
                  onChange={handleContentChange}
                  placeholder="Paste your 25,000 words here..."
                  className="min-h-[400px] font-mono text-sm"
                />
                
                <div className="flex gap-2">
                  <Button onClick={createTemplate} variant="outline">
                    Create Template
                  </Button>
                  <Button 
                    onClick={processContent} 
                    disabled={isProcessing || wordCount < 7000}
                    className="flex-1"
                  >
                    {isProcessing ? 'Processing...' : 'Process Content'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Preview */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Results Structure</CardTitle>
              <CardDescription>
                Your content will be organized into these 25 combinations:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {stages.map((stage, stageIndex) => (
                  <div key={stage} className="border rounded p-2">
                    <div className="font-semibold text-sm mb-1">
                      {stageIndex + 1}. {stage.charAt(0).toUpperCase() + stage.slice(1)}
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      {masks.map((mask, maskIndex) => (
                        <div key={mask} className="flex justify-between">
                          <span>{mask}</span>
                          <span className="text-gray-400">
                            {stageIndex + 1}-{maskIndex + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Results */}
      {result && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-green-600">✅ Success!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700">{result}</p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-red-600">❌ Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>📋 How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold">1. Paste Your Content</h4>
              <p className="text-sm text-gray-600">
                Copy and paste your 25,000 words into the text area above.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">2. Automatic Organization</h4>
              <p className="text-sm text-gray-600">
                The AI will automatically split your content into 25 equal parts (roughly 1,000 words each).
              </p>
            </div>
            <div>
              <h4 className="font-semibold">3. Structured Results</h4>
              <p className="text-sm text-gray-600">
                Each part will be assigned to one of the 25 partner stage/mask combinations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">4. Automatic Selection</h4>
              <p className="text-sm text-gray-600">
                When users complete the test, the system will automatically show the correct result based on their scores.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 