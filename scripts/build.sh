#!/bin/sh

# Get customer from environment variables
CUSTOMER=$(printenv VITE_CUSTOMER)

echo "Building for customer: $CUSTOMER"

# Double check confirmation before proceeding
echo "⚠️  You are about to build for customer: $CUSTOMER"
echo "This will create/overwrite the build content for this customer."
echo ""
read -p "Are you sure you want to proceed? (y/N): " confirm

case $confirm in
    [yY]|[yY][eE][sS])
        echo "✅ Confirmed. Proceeding with build for $CUSTOMER..."
        ;;
    *)
        echo "❌ Build cancelled."
        exit 1
        ;;
esac

echo ""

# Create a temporary directory to store the current build if it exists
TEMP_DIR="./temp_build"
if [ -d "./build" ]; then
    mkdir -p $TEMP_DIR
    mv ./build/* $TEMP_DIR 2>/dev/null
fi

# Set environment variable and run build command
VITE_CUSTOMER=$CUSTOMER pnpm vite build --mode build/$CUSTOMER

# Create customer-specific build directory if it doesn't exist
mkdir -p ./build/$CUSTOMER

# Move new build files to the customer-specific folder
mv ./build/* ./build/$CUSTOMER 2>/dev/null

# Move the previous files (from temp) back to the build directory, avoiding overwrites
if [ -d $TEMP_DIR ]; then
    mv $TEMP_DIR/* ./build 2>/dev/null
    rm -rf $TEMP_DIR
fi

echo "Build completed for customer: $CUSTOMER"
