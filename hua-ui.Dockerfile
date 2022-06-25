FROM node:16-alpine3.15 as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install --legacy-peer-deps
RUN npm run build

FROM nginx:latest
COPY --from=build /usr/local/app/dist/hua-ui /usr/share/nginx/html
EXPOSE 80