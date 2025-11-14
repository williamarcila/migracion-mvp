FROM php:8.2-apache

# Dependencias
RUN apt-get update && apt-get install -y libpq-dev zip unzip git curl \
    && docker-php-ext-install pdo pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

# Apache
RUN a2enmod rewrite

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# WORKDIR = backend
WORKDIR /var/www/html/backend

# Copia composer.json
COPY backend/composer.json ./

# Instala dependencias
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Copia TODO el backend
COPY backend/ .

# Laravel: artisan está en /backend
RUN php artisan key:generate --no-interaction --force \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Permisos
RUN chown -R www-data:www-data storage bootstrap/cache

# DocumentRoot = public
RUN sed -i 's|/var/www/html|/var/www/html/backend/public|g' /etc/apache2/sites-available/000-default.conf

EXPOSE 80
CMD ["apache2-foreground"]
