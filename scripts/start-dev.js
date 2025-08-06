const { exec } = require('child_process');
const { spawn } = require('child_process');

console.log('🚀 Starting development server on port 3000...');

// Function to kill process on port 3000
function killProcessOnPort3000() {
  return new Promise((resolve) => {
    // For Windows
    exec('netstat -ano | findstr :3000', (error, stdout) => {
      if (stdout) {
        const lines = stdout.split('\n');
        lines.forEach(line => {
          const parts = line.trim().split(/\s+/);
          if (parts.length > 4 && parts[1].includes(':3000')) {
            const pid = parts[4];
            console.log(`🔫 Killing process ${pid} on port 3000...`);
            exec(`taskkill /F /PID ${pid}`, (killError) => {
              if (killError) {
                console.log(`⚠️  Could not kill process ${pid}: ${killError.message}`);
              } else {
                console.log(`✅ Killed process ${pid}`);
              }
            });
          }
        });
      }
      // Wait a bit for processes to be killed
      setTimeout(resolve, 1000);
    });
  });
}

// Function to start Next.js dev server
function startDevServer() {
  console.log('🚀 Starting Next.js development server...');
  
  const devProcess = spawn('npx', ['next', 'dev', '-p', '3000'], {
    stdio: 'inherit',
    shell: true
  });

  devProcess.on('error', (error) => {
    console.error('❌ Failed to start development server:', error);
  });

  devProcess.on('close', (code) => {
    console.log(`🛑 Development server stopped with code ${code}`);
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Stopping development server...');
    devProcess.kill('SIGINT');
  });
}

// Main execution
async function main() {
  try {
    await killProcessOnPort3000();
    startDevServer();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main(); 