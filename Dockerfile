FROM node:current-alpine as node

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --prod

FROM nginx:alpine

COPY --from=node /app/dist/pingo-frontend /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off"]