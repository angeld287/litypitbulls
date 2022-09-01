FROM node

WORKDIR /usr/src/app

RUN npm install -g typescript

RUN npm install -g nodemon

COPY ./package*.json ./

RUN npm install

COPY . .

RUN chown -R node:node /usr/src/app
USER node

EXPOSE 3000

#Build to project
RUN npm run build

RUN npm ci --only=production 

# Run node server
#CMD npm run start
CMD ["node", "dist/Server.js"]