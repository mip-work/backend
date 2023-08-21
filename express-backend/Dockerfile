# Use uma imagem base do Node.js
FROM node:16

# Crie um diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e yarn.lock para o diretório de trabalho
COPY package.json yarn.lock ./

# Instale as dependências usando o Yarn
RUN yarn

# Copie todo o código-fonte para o diretório de trabalho
COPY . .

# Instale o Prisma CLI globalmente (caso ainda não esteja instalado)
RUN yarn global add prisma

ENV DATABASE_URL_PLANET_SCALE="mysql://seu_usuario:sua_senha@db:3306/sua_base_de_dados"
# Gere o Prisma Client com os binários apropriados
RUN prisma generate

# Porta em que sua aplicação irá ouvir
EXPOSE 3009

# Comando para iniciar sua aplicação usando o Yarn run dev
CMD ["yarn", "run", "dev"]