FROM node:16.18-alpine3.15
WORKDIR /usr/src/app
COPY client/package*.json ./
RUN ls -l
RUN npm install
COPY client ./
RUN ls -l
RUN npm run build
COPY client/nodeServer.cjs dist/nodeServer.cjs
WORKDIR /usr/src/app/dist
EXPOSE 8080
CMD [ "node", "nodeServer.cjs" ]