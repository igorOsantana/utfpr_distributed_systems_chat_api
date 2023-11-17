FROM node:20

RUN mkdir -p /usr/src/chat-api
WORKDIR /usr/src/chat-api

COPY . /usr/src/chat-api/

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]