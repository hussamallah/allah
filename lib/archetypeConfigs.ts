import { ArchetypeConfig } from '@/components/ArchetypeAllDiagnoses';
import { getAllVisionaryResults } from './visionaryStageTestUtils';
import { getAllGuardianResults } from './guardianStageTestUtils';
import { getAllMaskResults } from './maskStageTestUtils';
import { getAllPartnerResults } from './partnerStageTestUtils';
import { getAllProviderResults } from './providerStageTestUtils';
import { getAllRebelResults } from './rebelStageTestUtils';
import { getAllSovereignResults } from './sovereignStageTestUtils';
import { getAllSpotlightResults } from './spotlightStageTestUtils';
import { getAllTestStageSeekerResults } from './testStageSeekerStageTestUtils';
import { getAllWandererResults } from './wandererStageTestUtils';
import { getAllEqualizerResults } from './equalizerStageTestUtils';
import { getAllSeekerResults } from './seekerStageTestUtils';

export const archetypeConfigs: { [key: string]: ArchetypeConfig } = {
  visionary: {
    name: 'Visionary',
    color: 'text-purple-400',
    quizPath: '/chamber/visionary/quiz',
    results: getAllVisionaryResults()
  },
  guardian: {
    name: 'Guardian',
    color: 'text-blue-400',
    quizPath: '/chamber/guardian/quiz',
    results: getAllGuardianResults()
  },
  mask: {
    name: 'Mask',
    color: 'text-green-400',
    quizPath: '/chamber/mask/quiz',
    results: getAllMaskResults()
  },
  partner: {
    name: 'Partner',
    color: 'text-pink-400',
    quizPath: '/chamber/partner/quiz',
    results: getAllPartnerResults()
  },
  provider: {
    name: 'Provider',
    color: 'text-yellow-400',
    quizPath: '/chamber/provider/quiz',
    results: getAllProviderResults()
  },
  rebel: {
    name: 'Rebel',
    color: 'text-red-400',
    quizPath: '/chamber/rebel/quiz',
    results: getAllRebelResults()
  },
  sovereign: {
    name: 'Sovereign',
    color: 'text-indigo-400',
    quizPath: '/chamber/sovereign/quiz',
    results: getAllSovereignResults()
  },
  spotlight: {
    name: 'Spotlight',
    color: 'text-orange-400',
    quizPath: '/chamber/spotlight/quiz',
    results: getAllSpotlightResults()
  },
  'test-stage-seeker': {
    name: 'Test Stage Seeker',
    color: 'text-teal-400',
    quizPath: '/chamber/test-stage-seeker/quiz',
    results: getAllTestStageSeekerResults()
  },
  wanderer: {
    name: 'Wanderer',
    color: 'text-cyan-400',
    quizPath: '/chamber/wanderer/quiz',
    results: getAllWandererResults()
  },
  equalizer: {
    name: 'Equalizer',
    color: 'text-emerald-400',
    quizPath: '/chamber/equalizer/quiz',
    results: getAllEqualizerResults()
  },
  seeker: {
    name: 'Seeker',
    color: 'text-violet-400',
    quizPath: '/chamber/seeker/quiz',
    results: getAllSeekerResults()
  }
};

export function getArchetypeConfig(archetype: string): ArchetypeConfig | null {
  return archetypeConfigs[archetype] || null;
} 