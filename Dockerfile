FROM node:lts-alpine

#instalacja prostego serwera http
RUN npm install -g http-server

# twworzenie folderu app
WORKDIR /app

#kopiowanie package.json i package-lock.json
COPY package*.json ./

# instalowanie zależności
RUN npm install

# kopiowanie plików i katalogow projektu
COPY . .

#budowanie aplikacji
RUN npm run build

# Użyj Nginx do serwowania plików statycznych
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Eksponuj port Nginx
EXPOSE 80

# Domyślna konfiguracja Nginx
CMD ["nginx", "-g", "daemon off;"]