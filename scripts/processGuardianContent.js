const fs = require('fs');
const path = require('path');

// Import the content organizer functions
const { 
  processGuardianContent, 
  validateGuardianContent, 
  createContentTemplate 
} = require('../lib/guardianContentOrganizer.ts');

/**
 * Main function to process guardian content
 */
async function main() {
  console.log('🛡️  Guardian Content Processor');
  console.log('==============================\n');

  // Check if content file exists
  const contentFilePath = path.join(__dirname, 'guardianContent.txt');
  
  if (!fs.existsSync(contentFilePath)) {
    console.log('❌ Content file not found!');
    console.log(`📁 Please create: ${contentFilePath}`);
    console.log('\n📝 Creating template file...');
    
    const template = createContentTemplate();
    fs.writeFileSync(contentFilePath, template);
    
    console.log('✅ Template created!');
    console.log('📋 Please paste your 25,000 words into the template file and run this script again.');
    return;
  }

  // Read the content file
  console.log('📖 Reading content file...');
  const rawContent = fs.readFileSync(contentFilePath, 'utf8');

  // Validate the content
  console.log('🔍 Validating content...');
  const validation = validateGuardianContent(rawContent);
  
  console.log(`📊 ${validation.message}`);
  console.log(`📈 Word count: ${validation.wordCount}`);
  
  if (!validation.isValid) {
    console.log('❌ Content validation failed!');
    console.log('💡 Please ensure you have at least 7,000 words.');
    return;
  }

  // Process the content
  console.log('⚙️  Processing content...');
  const processedJSON = processGuardianContent(rawContent);

  // Save the processed content
  const outputPath = path.join(__dirname, '..', 'data', 'guardianStageTestResults.json');
  fs.writeFileSync(outputPath, processedJSON);

  console.log('✅ Content processed successfully!');
  console.log(`📁 Saved to: ${outputPath}`);
  console.log('\n🎉 Your 25,000 words have been organized into 25 guardian test results!');
  console.log('🚀 The system will now automatically select the correct result based on test scores.');
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});

// Run the script
main().catch(console.error); 