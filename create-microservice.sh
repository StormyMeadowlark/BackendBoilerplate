#!/bin/bash

# Usage: ./create-microservice.sh service-name

SERVICE_NAME=$1
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE_DIR="$SCRIPT_DIR"
DEST_DIR="$SCRIPT_DIR/../$SERVICE_NAME"
DEST_DIR=../$SERVICE_NAME

if [ -z "$SERVICE_NAME" ]; then
  echo "❌ Error: You must provide a service name."
  exit 1
fi

echo "🚀 Creating new microservice: $SERVICE_NAME"

# Step 1: Copy the boilerplate
cp -r $TEMPLATE_DIR $DEST_DIR

# Step 2: Replace placeholder names
cd $DEST_DIR
sed -i "s/BackendBoilerplate/$SERVICE_NAME/g" package.json README.md Dockerfile

# Step 3: Rename git remote if needed
rm -rf .git
git init
git add .
git commit -m "Init $SERVICE_NAME microservice from boilerplate"

# Step 4: add a Repo to github for microservice
git remote add origin git@github.com:StormyMeadowlark/$SERVICE_NAME.git
git branch -M main
git push -u origin main

echo "✅ $SERVICE_NAME microservice created at $DEST_DIR"
