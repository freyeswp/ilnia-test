FROM php:8.2-cli

# Directorio de trabajo
WORKDIR /var/www/app

# Instalar dependencias
RUN apt-get update && apt-get install -y \
    git unzip curl libzip-dev dos2unix \
    && docker-php-ext-install zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Symfony CLI
RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' | bash \
    && apt-get install -y symfony-cli \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copiar entrypoint.sh desde el build context
COPY entrypoint.sh /entrypoint.sh

# Convertir a LF y dar permisos
RUN dos2unix /entrypoint.sh
RUN chmod +x /entrypoint.sh

# ENTRYPOINT absoluto
ENTRYPOINT ["/entrypoint.sh"]
