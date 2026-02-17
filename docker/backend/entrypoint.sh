#!/bin/sh

if [ ! -f "composer.json" ]; then
  echo "Creanto proyecto Symfony..."
  symfony new /var/www/app --no-git
fi

cd /var/www/app

composer install

symfony server:start --no-tls --allow-http --port=8000 --listen-ip=0.0.0.0
