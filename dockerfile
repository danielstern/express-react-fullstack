FROM node:13-alpine
COPY ./package.json .
RUN npm install 
COPY . .
RUN npm run build 
CMD npm start

