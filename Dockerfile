FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/ /usr/vuejs/nginx