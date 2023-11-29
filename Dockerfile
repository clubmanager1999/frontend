FROM nginx

COPY dist /usr/share/nginx/html

COPY replace.entrypoint.sh /docker-entrypoint.d
