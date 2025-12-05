#!/bin/bash
set -e

APP_NAME="demo-app"
PORT=3000

echo "🔹 Stopping old container (if exists)..."
docker stop $APP_NAME || true
docker rm $APP_NAME || true

echo "🔹 Running new container..."
docker run -d \
  --name $APP_NAME \
  -p $PORT:3000 \
  auto-rollback-demo:latest

echo "✅ Deployment completed."
