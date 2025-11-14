FROM php:8.2-apache

# Instala dependencias + PostgreSQL dev
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libpq-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

# Habilita mod rewrite
RUN a2enmod rewrite

# Instala Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Directorio de trabajo
WORKDIR /var/www/html

# COPIA PRIMERO composer.json para caché (sin scripts)
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --optimize-autoloader --no-interaction

# AHORA COPIA TODO EL CÓDIGO (incluyendo artisan)
COPY . .

# EJECUTA SCRIPTS DE COMPOSER (ahora artisan existe)
RUN composer run-script post-autoload-dump

# Genera clave Laravel (AHORA SÍ funciona)
RUN php artisan key:generate --no-interaction --force

# Permisos
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expone puerto
EXPOSE 80

# Start command
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=80"]
