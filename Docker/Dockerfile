# Alpine reduced version and updated
FROM node:alpine

WORKDIR /usr/app
# copy packagejson
COPY package*.json ./
#and run npm install
RUN npm install
# copy other files
COPY . .

EXPOSE 3000
#name to execute container
CMD ["npm", "start"]