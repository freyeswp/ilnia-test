#!/bin/sh

if [ ! -f "package.json" ]; then
  echo "Creando React app..."
  create-react-app /app --use-npm
fi

cd /app

npm install
npm start
