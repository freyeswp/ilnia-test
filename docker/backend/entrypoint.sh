#!/bin/sh

cd /var/www/app

# Instala dependencias si es necesario
if [ -f "composer.json" ]; then
    composer install
fi

# Inicia Symfony server para desarrollo
symfony server:start --no-tls --allow-http --allow-all-ip --port=8000
