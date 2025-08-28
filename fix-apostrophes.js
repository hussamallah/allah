const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'chamber', '[archetype]', 'page.tsx');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Pattern to find single-quoted strings that contain apostrophes
// This regex looks for single quotes, then any content including apostrophes, then closing single quote
const singleQuoteWithApostropheRegex = /'([^']*'[^']*)'/g;

// Replace all instances
let match;
let replacements = 0;

while ((match = singleQuoteWithApostropheRegex.exec(content)) !== null) {
  const fullMatch = match[0];
  const innerContent = match[1];
  
  // If the inner content contains an apostrophe, convert to double quotes
  if (innerContent.includes("'")) {
    const newString = `"${innerContent}"`;
    content = content.replace(fullMatch, newString);
    replacements++;
    console.log(`Fixed: ${fullMatch} -> ${newString}`);
  }
}

// Write the fixed content back to the file
fs.writeFileSync(filePath, content, 'utf8');

console.log(`\nFixed ${replacements} instances of apostrophes in single-quoted strings.`);
console.log('File has been updated successfully.');
