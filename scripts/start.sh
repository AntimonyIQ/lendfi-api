#!/bin/bash

echo "Select an option:"
echo "1. Test"
echo "2. Development"
echo "3. Production"

read -p "Enter the option number: " option

case $option in
    1)
        echo "Running tests..."
        npm run test
        ;;
    2)
        echo "Starting development server..."
        npm run dev
        ;;
    3)
        echo "Starting production server..."
        npm start
        ;;
    *)
        echo "Invalid option"
        ;;
esac
