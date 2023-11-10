FROM php:7.4-apache

ENV COMPOSER_ALLOW_SUPERUSER 1

COPY ./apache-config.conf /etc/apache2/sites-available/apache-config.conf
RUN a2ensite apache-config

RUN apt-get update \
    && apt-get install -y \
    vim \
    curl \
    libxml2-dev \
    zip \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

COPY . /var/www/html/

WORKDIR /var/www/html/

RUN chown -R www-data:www-data /var/www/html/
RUN chmod -R 755 /var/www/html/

RUN docker-php-ext-install xml dom

RUN composer install
RUN npm install

CMD service apache2 start && npm run watch