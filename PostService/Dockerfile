#Base Image
FROM php:7.4-cli

WORKDIR /usr/app

#Install Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php --install-dir=. --filename=composer
RUN mv composer /usr/local/bin/

COPY ./composer.json .
COPY ./composer.lock .

RUN apt-get update && apt-get install -y \
    zlib1g-dev \
    libzip-dev \
    unzip
RUN docker-php-ext-install zip mysqli pdo pdo_mysql sockets

RUN composer install

COPY . .

CMD [ "sh","-c", "php message_broker_listening.php & php manage.php migrate && php -S 0.0.0.0:4000 index.php" ]
