Write-Host "Select an option:"
Write-Host "1. Test"
Write-Host "2. Development"
Write-Host "3. Production"

$option = Read-Host -Prompt "Enter the option number"

switch ($option) {
    "1" {
        Write-Host "Running tests..."
        npm run test
        break
    }
    "2" {
        Write-Host "Starting development server..."
        npm run dev
        break
    }
    "3" {
        Write-Host "Starting production server..."
        npm start
        break
    }
    default {
        Write-Host "Invalid option"
        break
    }
}
