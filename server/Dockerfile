FROM node:16.18-alpine3.15
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
COPY . ./
RUN ls -l
EXPOSE 8080
CMD ["npm", "run", "start"]