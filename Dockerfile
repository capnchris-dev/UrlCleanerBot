FROM node:24-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

RUN rm -rf /src

CMD ["npm", "run", "start"]