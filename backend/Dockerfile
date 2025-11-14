FROM php:8.2-apache

# Instala dependencias
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev zip unzip git curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql pdo_pgsql

# Habilita mod rewrite
RUN a2enmod rewrite

# Instala Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copia código
WORKDIR /var/www/html
COPY . .

# Instala dependencias Laravel (aquí hace el "pre-deploy")
RUN composer install --no-dev --optimize-autoloader

# Genera clave Laravel (parte del build)
RUN php artisan key:generate --no-interaction --force

# Permisos
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expone puerto
EXPOSE 80

# Start command (Laravel serve)
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=80"]
