const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'chamber', '[archetype]', 'page.tsx');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Specific replacements for the problematic strings we identified
const replacements = [
  {
    old: "prompt: 'What if being helped doesn't mean being owned?'",
    new: "prompt: \"What if being helped doesn't mean being owned?\""
  },
  {
    old: "prompt: 'What if belonging didn't mean betrayal?'",
    new: "prompt: \"What if belonging didn't mean betrayal?\""
  },
  {
    old: "diagnostic: 'You remember who gave what, who didn't. Your memory is exact, even if your voice is silent. But invisible accounting creates quiet wars.',",
    new: "diagnostic: \"You remember who gave what, who didn't. Your memory is exact, even if your voice is silent. But invisible accounting creates quiet wars.\","
  },
  {
    old: "diagnostic: 'You neutralize yourself so others feel comfortable. You avoid shining too bright, speaking too loud. But equality shouldn't require invisibility.',",
    new: "diagnostic: \"You neutralize yourself so others feel comfortable. You avoid shining too bright, speaking too loud. But equality shouldn't require invisibility.\","
  }
];

let totalReplacements = 0;

// Apply each replacement
replacements.forEach((replacement, index) => {
  if (content.includes(replacement.old)) {
    content = content.replace(replacement.old, replacement.new);
    totalReplacements++;
    console.log(`Fixed replacement ${index + 1}: ${replacement.old.substring(0, 50)}...`);
  } else {
    console.log(`Replacement ${index + 1} not found in file`);
  }
});

// Write the fixed content back to the file
fs.writeFileSync(filePath, content, 'utf8');

console.log(`\nApplied ${totalReplacements} specific fixes.`);
console.log('File has been updated successfully.');
