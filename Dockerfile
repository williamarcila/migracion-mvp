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

# Copia TODO el backend
COPY backend/ .

# Instala dependencias (composer.json ya está copiado)
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Laravel
RUN php artisan key:generate --no-interaction --force \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Permisos
RUN chown -R www-data:www-data storage bootstrap/cache

# Apache: apuntar a public
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

EXPOSE 80
CMD ["apache2-foreground"]
