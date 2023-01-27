FROM node:16-alpine as builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx

EXPOSE 80

#COPY nginx config file
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
#COPY built site
COPY --from=builder /app/build /usr/share/nginx/html

# generate image:
# docker build -t <app name> .

# run the app
# docker run -d -p 80:80 <app name>
# OR GENERATE WITH COMPOSE
