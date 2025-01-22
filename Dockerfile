FROM node:19 AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY . ./
RUN npm install
RUN npm run build

FROM  --platform=linux/amd64 nginx:1.19-alpine
RUN ls -al
COPY --from=build /app/public /usr/share/nginx/html