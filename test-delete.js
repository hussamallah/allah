// Simple test to check delete functionality
console.log('🧪 Testing delete functionality...')

// Test the API endpoint directly
async function testDelete() {
  try {
    // This will fail without environment variables, but let's see the error
    const response = await fetch('http://localhost:3000/api/war-room/profiles/test-id', {
      method: 'DELETE'
    })
    
    console.log('Response status:', response.status)
    const data = await response.json()
    console.log('Response data:', data)
    
  } catch (error) {
    console.error('Error testing delete:', error.message)
  }
}

// Check if we're in a browser environment
if (typeof window !== 'undefined') {
  testDelete()
} else {
  console.log('This script needs to run in a browser environment')
  console.log('Please open the war room in your browser and check the console for delete errors')
} 