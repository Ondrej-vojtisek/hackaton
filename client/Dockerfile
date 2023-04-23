FROM node:19-alpine as builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.24.0-alpine as production
COPY --chown=nginx:nginx --from=builder /app/dist/ /usr/share/nginx/html
COPY ./docker-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

