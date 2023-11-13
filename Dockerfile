# Użyj oficjalnego obrazu PHP z Docker Hub
FROM php:7.2-apache

# Ustalamy katalog roboczy
WORKDIR /var/www/html

# Instalujemy niezbędne pakiety
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y git curl zip libzip-dev

# Instalujemy Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instalujemy Node.js i npm
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# Kopiujemy nasze pliki do kontenera
COPY . .

# Kopiujemy naszą konfigurację Apache do kontenera
COPY ./000-default.conf /etc/apache2/sites-available/

# Instalujemy zależności z composer i npm
RUN composer install
RUN npm install

# Zmieniamy właściciela wszystkich plików w katalogu /var/www
RUN chown -R www-data:www-data /var/www

# Aktywujemy mod_rewrite dla Apache
RUN a2enmod rewrite

# Uruchamiamy komendę npm run dev
RUN npm run build

# Restartujemy Apache ze zmienioną konfiguracją
RUN service apache2 restart

# Udostępniamy porty http i https
EXPOSE 80 443