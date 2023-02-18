FROM nginx:1.23-alpine

RUN apk update && \
    apk add --no-cache openssl

COPY ./config /etc/nginx/

RUN find /etc/nginx/ -type f -exec \
    sed -i 's/example.com/${DOMAIN}/g' {} +

RUN openssl dhparam -out /etc/nginx/dhparam.pem 2048

RUN mkdir -p /var/www/_letsencrypt