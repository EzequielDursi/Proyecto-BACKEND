FROM node
WORKDIR /app
COPY package*.json ./
COPY src /app/src
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
