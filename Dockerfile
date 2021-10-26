FROM node:14.17-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 1337
CMD [ "node", "app.js"]