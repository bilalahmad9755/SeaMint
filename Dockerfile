FROM node:16

WORKDIR /nestjs-app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
EXPOSE 27017

CMD [ "npm", "run", "start:dev" ]