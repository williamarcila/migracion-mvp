FROM php:8.2-apache

# Dependencias
RUN apt-get update && apt-get install -y libpq-dev zip unzip git curl \
    && docker-php-ext-install pdo pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

# Apache
RUN a2enmod rewrite

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# WORKDIR = raíz del backend
WORKDIR /var/www/html

# Copia composer.json desde la raíz del repo (está en ./backend/composer.json)
COPY backend/composer.json ./

# Instala dependencias
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Copia TODO el código del backend
COPY backend/ .

# Laravel
RUN php artisan key:generate --no-interaction --force \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Permisos
RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 80
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=80"]
