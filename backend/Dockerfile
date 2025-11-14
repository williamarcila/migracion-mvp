# ===== BASE =====
FROM php:8.2-apache

# ===== VARIABLES DE ENTORNO =====
ENV APP_ENV=production
ENV APP_DEBUG=false

# ===== DEPENDENCIAS DEL SISTEMA =====
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
    && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

# ===== HABILITAR MOD_REWRITE =====
RUN a2enmod rewrite

# ===== INSTALAR COMPOSER =====
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# ===== DIRECTORIO DE TRABAJO =====
WORKDIR /var/www/html

# ===== COPIAR SOLO COMPOSER PRIMERO (caché eficiente) =====
COPY composer.json composer.lock ./

# Instalar dependencias sin scripts (aún no hay artisan)
RUN composer install --no-dev --no-scripts --optimize-autoloader --no-interaction

# ===== AHORA SÍ: COPIAR TODO EL CÓDIGO =====
COPY . .

# ===== EJECUTAR SCRIPTS DE COMPOSER (ahora artisan existe) =====
RUN composer run-script post-autoload-dump

# ===== GENERAR CLAVE (opcional en build, pero ahora SÍ funciona) =====
RUN php artisan key:generate --no-interaction --force || true

# ===== PERMISOS =====
RUN chown -R www-data:www-data \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache

# ===== CONFIGURAR APACHE =====
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# ===== EXPONER PUERTO =====
EXPOSE 80

# ===== COMANDO FINAL: Usar Apache, NO php artisan serve =====
# (artisan serve es para desarrollo, no producción)
CMD ["apache2-foreground"]
