FROM nginx:1.23-alpine

RUN rm /etc/nginx/conf.d/*

COPY ./docker/production/nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]