# Use uma imagem base do Node.js
#FROM node:16

# Crie um diretório de trabalho no contêiner
#WORKDIR /app

# Copie o package.json e yarn.lock para o diretório de trabalho
#COPY package.json yarn.lock ./

# Instale as dependências usando o Yarn
#RUN yarn

# Copie todo o código-fonte para o diretório de trabalho
#COPY . .

# Instale o Prisma CLI globalmente (caso ainda não esteja instalado)
#RUN yarn global add prisma

# Gere o Prisma Client com os binários apropriados
#RUN prisma generate

# Porta em que sua aplicação irá ouvir
#EXPOSE 3009

# Comando para iniciar sua aplicação usando o Yarn run dev
#CMD ["yarn", "run", "dev"]

FROM node:alpine
WORKDIR /app

# COPY package.json and package-lock.json files
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
# COPY tsconfig.json ./

# COPY
COPY . .

RUN npm install
#RUN npx prisma db push
RUN npx prisma generate

# Run and expose the server on port 3000
EXPOSE 3009

# A command to start the server
CMD npm start