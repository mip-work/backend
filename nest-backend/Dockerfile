#FROM node:16
FROM node:alpine
WORKDIR /app

# COPY package.json and package-lock.json files
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

COPY . .

RUN npm install
#RUN npx prisma db push
RUN npx prisma generate

# Run and expose the server on port 3000
EXPOSE 3009