#!/bin/sh
set -e

echo "Iniciando Laravel en producción..."

# Crear .env si no existe
if [ ! -f .env ]; then
    echo "Creando .env desde .env.example..."
    cp .env.example .env
else
    echo ".env ya existe."
fi

# Generar APP_KEY si está vacía
if ! grep -q '^APP_KEY=base64:' .env; then
    echo "Generando APP_KEY..."
    php artisan key:generate --no-interaction --force
else
    echo "APP_KEY ya configurada."
fi

# Migraciones (opcional, descomenta si quieres en producción)
# php artisan migrate --force

# Cache de configuración (recomendado en producción)
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Iniciando Apache..."
exec apache2-foreground
