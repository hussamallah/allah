# PowerShell script to add environment variables to Vercel
Write-Host "Setting up Vercel environment variables..." -ForegroundColor Green

# Supabase URL
Write-Host "Adding NEXT_PUBLIC_SUPABASE_URL..." -ForegroundColor Yellow
$supabaseUrl = "https://szedcfessmhnwmgfqfge.supabase.co"
echo $supabaseUrl | vercel env add NEXT_PUBLIC_SUPABASE_URL production

# Supabase Anon Key
Write-Host "Adding NEXT_PUBLIC_SUPABASE_ANON_KEY..." -ForegroundColor Yellow
$supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ZWRjZmVzc21obndtZ2ZxZmdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MzAxMjIsImV4cCI6MjA2NzQwNjEyMn0.bgA87qo7d4D6g7rxBZyd7roZG1Yn5XXCpVdxpWh4sso"
echo $supabaseKey | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

Write-Host "Environment variables added!" -ForegroundColor Green
Write-Host "Deploying to production..." -ForegroundColor Green

# Deploy to production
vercel --prod 