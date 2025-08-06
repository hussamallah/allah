# Spotlight Node Diagnostic Quiz

## Overview

The Spotlight Node is a modular diagnostic quiz that reveals your relationship to visibility, authenticity, and leadership. It consists of 5 stages with 4 questions each (20 total questions), providing 25 unique outcome diagnoses.

## Implementation Details

### Files Created

1. **`data/spotlightNodeQuiz.json`** - Quiz data structure with all questions, options, and diagnoses
2. **`lib/spotlightNodeScoring.ts`** - Scoring logic and TypeScript interfaces
3. **`components/SpotlightNodeQuiz.tsx`** - React component for the quiz interface
4. **`app/spotlight-node-quiz/page.tsx`** - Main quiz page
5. **`app/test-spotlight/page.tsx`** - Test page for verification

### Quiz Structure

#### Stages (5 total)
1. **The Hider** - Struggles to be seen, hides potential, fears judgment
2. **The Mimic** - Adapts, blends, or mirrors others to gain acceptance
3. **The Performer** - Leads with charm, reads the room, craves applause
4. **The Amplifier** - Expands energy, inspires others, risks overreaching
5. **The Luminary** - Radiates truth, stands in authentic presence

#### Scoring Logic
- Each stage has 4 questions
- Each answer has a value of 1-5
- **Dominant Stage**: Highest total score (where you truly are)
- **Mask Stage**: Lowest total score (where you hide/regress)
- Tiebreakers: Highest individual answer, then latest stage in journey

#### Outcomes
- 25 unique diagnoses (5 dominant × 5 mask combinations)
- Each diagnosis provides insight into your current state and growth direction

### Features

- **Randomized Answer Order**: Answer options are shuffled for each question
- **Progress Tracking**: Visual progress bar and question counter
- **Stage Awareness**: Shows current stage and description
- **Comprehensive Results**: Displays dominant stage, mask stage, diagnosis, and score breakdown
- **Retake Functionality**: Option to retake the quiz with new randomization

### Usage

#### Basic Implementation
```tsx
import SpotlightNodeQuiz from '../components/SpotlightNodeQuiz';
import spotlightNodeData from '../data/spotlightNodeQuiz.json';

function MyPage() {
  const handleComplete = (result) => {
    console.log('Quiz result:', result);
  };

  return (
    <SpotlightNodeQuiz 
      quizData={spotlightNodeData}
      onComplete={handleComplete}
    />
  );
}
```

#### Accessing Results
```tsx
const result = {
  dominantStage: "luminary",
  maskStage: "hider", 
  diagnosis: "Your light could guide thousands, but fear keeps you in the shadows...",
  stageScores: {
    hider: 10,
    mimic: 15,
    performer: 18,
    amplifier: 20,
    luminary: 19
  },
  stageDetails: {
    dominant: {
      key: "luminary",
      label: "The Luminary", 
             score: 19,
      description: "Radiates truth, stands in authentic presence..."
    },
    mask: {
      key: "hider",
      label: "The Hider",
             score: 10,  
      description: "Struggles to be seen, hides potential..."
    }
  }
};
```

### Testing

Visit `/test-spotlight` to run automated tests with different answer patterns:
- All maximum scores (5s)
- All minimum scores (1s) 
- Mixed score patterns

### Styling

The quiz uses a warm amber/orange color scheme with:
- Gradient backgrounds
- Card-based layout
- Progress indicators
- Responsive design
- Hover effects and transitions

### Customization

The quiz is fully customizable through:
- Modifying `spotlightNodeQuiz.json` for content changes
- Updating the scoring logic in `spotlightNodeScoring.ts`
- Styling changes in the React component
- Adding new features like result persistence or sharing

## Technical Notes

- Built with Next.js 14 and TypeScript
- Uses shadcn/ui components for consistent styling
- Implements proper state management with React hooks
- Includes comprehensive TypeScript interfaces
- Follows the existing project architecture patterns 