FROM node:latest

WORKDIR /app

COPY ./package.json /app
COPY ./.env /app
COPY ./data.db /app
COPY ./extensions/directus-extension-sentry/package.json /app

RUN npm install 

EXPOSE 8055

CMD [ "npx", "directus", "start" ]