FROM node:24-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

RUN cp ./src/util/flagged-params.json ./dist

RUN rm -rf ./src

CMD ["npm", "run", "start"]