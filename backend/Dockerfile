FROM php:8.2-apache

# Dependencias
RUN apt-get update && apt-get install -y \
    libpq-dev zip unzip git curl \
    && docker-php-ext-install pdo pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

# Mod rewrite
RUN a2enmod rewrite

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Directorio
WORKDIR /var/www/html

# Solo composer.json
COPY composer.json ./

# Instala (genera lock internamente)
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Copia código
COPY . .

# Laravel
RUN composer dump-autoload
RUN php artisan key:generate --no-interaction --force

# Permisos
RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 80
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=80"]
