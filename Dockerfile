FROM composer:2 as vendor

WORKDIR /app

COPY composer.* ./
RUN composer install --no-dev --no-scripts --prefer-dist

COPY . .

FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql zip

COPY --from=vendor /app /var/www/html

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

COPY ./apache.conf /etc/apache2/sites-available/000-default.conf

RUN a2enmod rewrite
