'use client';

import { useState, useEffect } from 'react';
import { getEnhancedGuardianResult, GuardianTestResult, GuardianNodeWallResult, WallRitual, getWallRituals } from '../lib/guardianStageTestUtils';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ChevronDown, ChevronRight, Shield, AlertTriangle, Target, ArrowUp, Heart, Clock } from 'lucide-react';

interface GuardianTestResultsProps {
  dominantStage: string;
  maskStage: string;
  stageScores: { [key: string]: number };
  onViewRituals?: () => void;
  onRetakeTest?: () => void;
}

interface AccordionSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
  variant?: 'default' | 'warning' | 'success' | 'info';
}

function AccordionSection({ title, icon, children, isExpanded = false, onToggle, variant = 'default' }: AccordionSectionProps) {
  const variantStyles = {
    default: 'border-gray-700 bg-gray-900',
    warning: 'border-red-700 bg-red-900/20',
    success: 'border-green-700 bg-green-900/20',
    info: 'border-blue-700 bg-blue-900/20'
  };

  return (
    <Card className={`${variantStyles[variant]} border transition-all duration-200`}>
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-blue-400">{icon}</div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        {isExpanded ? (
          <ChevronDown className="text-gray-400" />
        ) : (
          <ChevronRight className="text-gray-400" />
        )}
      </button>
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="border-t border-gray-700 pt-4">
            {children}
          </div>
        </div>
      )}
    </Card>
  );
}

function KeyInsightsBox({ result, wallContent }: { result: GuardianTestResult; wallContent?: GuardianNodeWallResult | null }) {
  const insights = [
    result.coreIssue,
    result.trueNeed,
    result.warning
  ];

  return (
    <Card className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-blue-700 p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Target className="text-blue-400" />
        <h3 className="text-xl font-bold text-blue-200">Key Insights</h3>
      </div>
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-blue-100 leading-relaxed">{insight}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function GuardianTestResults({
  dominantStage,
  maskStage,
  stageScores,
  onViewRituals,
  onRetakeTest
}: GuardianTestResultsProps) {
  const [result, setResult] = useState<GuardianTestResult | null>(null);
  const [wallContent, setWallContent] = useState<GuardianNodeWallResult | null>(null);
  const [wallRituals, setWallRituals] = useState<{ [key: string]: WallRitual }>({});
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['current-state']));

  useEffect(() => {
    const enhancedResult = getEnhancedGuardianResult(dominantStage, maskStage);
    if (enhancedResult) {
      setResult(enhancedResult);
      setWallContent(enhancedResult.wallContent || null);
    }
    
    if (dominantStage === 'wall') {
      setWallRituals(getWallRituals());
    }
    
    setLoading(false);
  }, [dominantStage, maskStage]);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Analyzing your Guardian path...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Result Not Found</h1>
          <p className="text-gray-400 mb-4">Unable to find result for your stage combination.</p>
          <Button onClick={onRetakeTest} className="bg-blue-600 hover:bg-blue-700">
            Retake Test
          </Button>
        </div>
      </div>
    );
  }

  const stageNames = ['Shielded', 'Holder', 'Wall', 'Gate', 'Anchor'];
  const maxScore = 20;
  const isWallStage = dominantStage === 'wall';

  // Parse the detailed content into sections
  const parseDetailedContent = (content: string) => {
    const sections: { [key: string]: string } = {};
    
    // Extract sections based on common patterns
    const sectionPatterns = [
      { key: 'current-state', pattern: /Your Current State:[\s\S]*?(?=Your Mask\/Fallback:|$)/ },
      { key: 'mask-fallback', pattern: /Your Mask\/Fallback:[\s\S]*?(?=The Loop|$)/ },
      { key: 'loop', pattern: /The Loop[\s\S]*?(?=What's Missing|$)/ },
      { key: 'missing', pattern: /What's Missing[\s\S]*?(?=Climbing Up|$)/ },
      { key: 'climbing', pattern: /Climbing Up[\s\S]*?(?=True Desire|$)/ },
      { key: 'desire', pattern: /True Desire[\s\S]*?(?=The Cost|$)/ },
      { key: 'cost', pattern: /The Cost of Staying Stuck[\s\S]*/ }
    ];

    sectionPatterns.forEach(({ key, pattern }) => {
      const match = content.match(pattern);
      if (match) {
        sections[key] = match[0].replace(/^(Your Current State:|Your Mask\/Fallback:|The Loop|What's Missing|Climbing Up|True Desire.*?:|The Cost of Staying Stuck)/, '').trim();
      }
    });

    return sections;
  };

  const contentSections = parseDetailedContent(result.detailedContent);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-blue-400">
            {wallContent ? wallContent.title : result.title}
          </h1>
          <div className="flex justify-center gap-4 mb-4">
            <Badge variant="outline" className="border-blue-500 text-blue-400">
              Stage: {result.stage}
            </Badge>
            <Badge variant="outline" className="border-indigo-500 text-indigo-400">
              Mask: {result.mask}
            </Badge>
            {isWallStage && (
              <Badge variant="outline" className="border-red-500 text-red-400">
                Wall Analysis
              </Badge>
            )}
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {wallContent ? wallContent.currentState : result.diagnosis}
          </p>
        </div>

        {/* Key Insights Box */}
        <KeyInsightsBox result={result} wallContent={wallContent} />

        {/* Stage Progress */}
        <Card className="bg-gray-900 border-gray-700 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400 flex items-center gap-3">
            <Shield className="text-blue-400" />
            Your Guardian Journey
          </h2>
          <div className="space-y-4">
            {stageNames.map((stageName) => {
              const score = stageScores[stageName.toLowerCase()] || 0;
              const percentage = (score / maxScore) * 100;
              const isCurrentStage = stageName.toLowerCase() === dominantStage;
              
              return (
                <div key={stageName} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${isCurrentStage ? 'text-blue-400' : 'text-gray-300'}`}>
                      {stageName}
                    </span>
                    <span className="text-sm text-gray-400">{score}/{maxScore}</span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className={`h-2 ${isCurrentStage ? 'bg-blue-900' : 'bg-gray-700'}`}
                  />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Detailed Analysis Sections */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-bold text-blue-400 mb-6">Your Guardian Analysis</h2>
          
          {/* Current State */}
          <AccordionSection
            title="Current State"
            icon={<Shield />}
            isExpanded={expandedSections.has('current-state')}
            onToggle={() => toggleSection('current-state')}
            variant="info"
          >
            <p className="text-gray-300 leading-relaxed text-lg">
              {contentSections['current-state'] || result.currentState}
            </p>
          </AccordionSection>

          {/* Mask/Fallback */}
          <AccordionSection
            title="Mask/Fallback"
            icon={<AlertTriangle />}
            isExpanded={expandedSections.has('mask-fallback')}
            onToggle={() => toggleSection('mask-fallback')}
            variant="warning"
          >
            <p className="text-gray-300 leading-relaxed text-lg">
              {contentSections['mask-fallback'] || result.coreIssue}
            </p>
          </AccordionSection>

          {/* Loop */}
          <AccordionSection
            title="The Loop"
            icon={<Clock />}
            isExpanded={expandedSections.has('loop')}
            onToggle={() => toggleSection('loop')}
            variant="warning"
          >
            <p className="text-gray-300 leading-relaxed text-lg">
              {contentSections['loop']}
            </p>
          </AccordionSection>

          {/* What's Missing */}
          <AccordionSection
            title="What's Missing"
            icon={<Target />}
            isExpanded={expandedSections.has('missing')}
            onToggle={() => toggleSection('missing')}
            variant="info"
          >
            <p className="text-gray-300 leading-relaxed text-lg">
              {contentSections['missing']}
            </p>
          </AccordionSection>

          {/* Climbing Up */}
          <AccordionSection
            title="Climbing Up"
            icon={<ArrowUp />}
            isExpanded={expandedSections.has('climbing')}
            onToggle={() => toggleSection('climbing')}
            variant="success"
          >
            <p className="text-gray-300 leading-relaxed text-lg">
              {contentSections['climbing']}
            </p>
          </AccordionSection>

          {/* Desire & Future-Self Insight */}
          <AccordionSection
            title="Desire & Future-Self Insight"
            icon={<Heart />}
            isExpanded={expandedSections.has('desire')}
            onToggle={() => toggleSection('desire')}
            variant="success"
          >
            <p className="text-gray-300 leading-relaxed text-lg">
              {contentSections['desire']}
            </p>
          </AccordionSection>

          {/* Cost of Staying Stuck */}
          <AccordionSection
            title="Cost of Staying Stuck"
            icon={<AlertTriangle />}
            isExpanded={expandedSections.has('cost')}
            onToggle={() => toggleSection('cost')}
            variant="warning"
          >
            <p className="text-gray-300 leading-relaxed text-lg">
              {contentSections['cost']}
            </p>
          </AccordionSection>
        </div>

        {/* Wall Stage Specific Content */}
        {wallContent && (
          <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-700 p-6 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-red-200 flex items-center gap-3">
              <AlertTriangle className="text-red-400" />
              Guardian Node Wall Analysis
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-red-100 mb-2">Your Wall Pattern:</h4>
                <p className="text-red-50 leading-relaxed">{wallContent.maskDescription}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-red-100 mb-2">Transformation:</h4>
                <p className="text-red-50 leading-relaxed text-lg">{wallContent.transformation}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Wall Rituals */}
        {Object.keys(wallRituals).length > 0 && (
          <Card className="bg-gray-900 border-gray-700 p-6 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-blue-400">Wall Transformation Rituals</h3>
            <div className="space-y-6">
              {Object.entries(wallRituals).map(([key, ritual]) => (
                <div key={key} className="border border-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-300 mb-2">{ritual.title}</h4>
                  <p className="text-gray-300 mb-3">{ritual.description}</p>
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-200">Steps:</h5>
                    <ol className="list-decimal list-inside space-y-1 text-gray-300">
                      {ritual.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Transformation */}
        <Card className="bg-gradient-to-r from-blue-900 to-indigo-900 border-blue-700 p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 text-blue-200 flex items-center gap-3">
            <ArrowUp className="text-blue-400" />
            Transformation
          </h3>
          <p className="text-blue-100 leading-relaxed text-lg">
            {wallContent ? wallContent.transformation : result.transformation}
          </p>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gray-900 border-gray-700 p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 text-blue-400">Your Path Forward</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-200 mb-2">Ritual Focus:</h4>
              <p className="text-gray-300">
                {wallContent ? wallContent.ritualFocus : result.ritualFocus}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-200 mb-2">Next Stage:</h4>
              <p className="text-gray-300">
                {wallContent ? wallContent.nextStage : result.nextStage}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-200 mb-2">Progress Path:</h4>
              <p className="text-gray-300">
                {wallContent ? wallContent.progressPath : result.progressPath}
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {onViewRituals && (
            <Button 
              onClick={onViewRituals}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              View Recommended Rituals
            </Button>
          )}
          {onRetakeTest && (
            <Button 
              onClick={onRetakeTest}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg"
            >
              Retake Test
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 