FROM php:8.2-apache

ENV APP_ENV=production
ENV APP_DEBUG=false

# Dependencias del sistema
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev libpq-dev zip unzip git curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

# Mod rewrite
RUN a2enmod rewrite

# Composer (oficial, más rápido)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Directorio de trabajo
WORKDIR /var/www/html

# Copiar composer primero (caché)
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --optimize-autoloader --no-interaction

# Copiar TODO el código
COPY . .

# Ejecutar scripts de Composer
RUN composer run-script post-autoload-dump

# Permisos
RUN chown -R www-data:www-data storage bootstrap/cache

# Config Apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Entry point
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["apache2-foreground"]
