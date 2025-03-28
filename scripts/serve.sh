#!/bin/sh

# Get customer from environment variables
CUSTOMER=$(printenv VITE_CUSTOMER)

if [ -z "$CUSTOMER" ]; then
    echo "Error: No customer specified."
    exit 1
fi

# Check if the customer build folder exists
if [ ! -d "./build/$CUSTOMER" ]; then
    echo "Error: Build for customer '$CUSTOMER' does not exist."
    exit 1
fi

echo "Serving build for customer: $CUSTOMER"
vite preview --mode build/$CUSTOMER

echo "Serving completed for customer: $CUSTOMER"
