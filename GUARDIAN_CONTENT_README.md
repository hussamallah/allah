# 🛡️ Guardian Content Processor

This system allows you to paste your 25,000 words of guardian content and automatically organize them into 25 structured test results.

## 📋 How to Use

### Option 1: Web Interface (Recommended)
1. Go to: `http://localhost:3000/guardian-content-processor`
2. Paste your 25,000 words into the text area
3. Click "Process Content"
4. The system will automatically organize your content into 25 results

### Option 2: Manual File Processing
1. Create a file: `scripts/guardianContent.txt`
2. Paste your 25,000 words into this file
3. Run: `node scripts/processGuardianContent.js`

## 🎯 What Happens

Your 25,000 words will be automatically distributed across 25 guardian test results:

| Stage | Mask | Score | Description |
|-------|------|-------|-------------|
| Shielded | Shielded | 1-1 | Defensive and withdrawn |
| Shielded | Holder | 1-2 | Silent martyr |
| Shielded | Wall | 1-3 | Fortified isolation |
| Shielded | Gate | 1-4 | Open but hidden |
| Shielded | Anchor | 1-5 | Hidden anchor |
| Holder | Shielded | 2-1 | Carrier who retreats |
| Holder | Holder | 2-2 | Exhausted support |
| Holder | Wall | 2-3 | Hidden protector |
| Holder | Gate | 2-4 | Inconsistent boundaries |
| Holder | Anchor | 2-5 | Shifting foundation |
| Wall | Shielded | 3-1 | Strong but retreating |
| Wall | Holder | 3-2 | Boundary with exceptions |
| Wall | Wall | 3-3 | Unbreakable but rigid |
| Wall | Gate | 3-4 | Strong but unselective |
| Wall | Anchor | 3-5 | Strong but invisible |
| Gate | Shielded | 4-1 | Selective but hiding |
| Gate | Holder | 4-2 | Selective but over-giving |
| Gate | Wall | 4-3 | Selective but restrictive |
| Gate | Gate | 4-4 | Balanced selector |
| Gate | Anchor | 4-5 | Selective but unstable |
| Anchor | Shielded | 5-1 | Anchor who retreats |
| Anchor | Holder | 5-2 | Stable but over-giving |
| Anchor | Wall | 5-3 | Stable but restrictive |
| Anchor | Gate | 5-4 | Stable selector |
| Anchor | Anchor | 5-5 | Unshakable anchor |

## 🔄 Automatic Result Selection

After processing, when users complete the guardian test:

1. **Test calculates scores** (e.g., "3-2" for Wall | Holder)
2. **System looks up result** in the organized content
3. **Displays the correct 1000-word result** based on their scores

## 📁 File Structure

```
hussamallah/
├── data/
│   └── guardianStageTestResults.json    # Final organized content
├── lib/
│   ├── guardianContentOrganizer.ts      # Processing logic
│   └── guardianStageTestUtils.ts        # Result lookup functions
├── app/
│   ├── guardian-content-processor/      # Web interface
│   └── api/process-guardian-content/    # API endpoint
└── scripts/
    └── processGuardianContent.js        # Command line tool
```

## ✅ Requirements

- **Minimum words**: 7,000 (recommended: 25,000)
- **Content format**: Plain text
- **Organization**: The AI will automatically split and organize your content

## 🚀 Getting Started

1. **Start your development server**: `npm run dev`
2. **Visit the processor**: `http://localhost:3000/guardian-content-processor`
3. **Paste your content** and click "Process Content"
4. **Test the results** by completing a guardian test

## 🔧 Technical Details

The system uses:
- **Content splitting**: Divides your 25,000 words into 25 equal chunks (~1,000 words each)
- **JSON structure**: Organizes content into the existing guardian test result format
- **Score mapping**: Maps test scores (e.g., "3-2") to the correct content chunk
- **Automatic lookup**: Uses existing `getGuardianTestResult()` function to display results

## 📝 Example Usage

```typescript
// After processing, the system automatically works:
import { getGuardianTestResult } from '@/lib/guardianStageTestUtils';

// User completes test with scores
const result = getGuardianTestResult('wall', 'holder'); // Score: 3-2

// Returns the organized 1000-word content for Wall | Holder
console.log(result.detailedContent); // Your 1000 words here
```

## 🎉 Success!

Once processed, your 25,000 words will be automatically available in the guardian test system, with each user getting the correct result based on their test scores! 