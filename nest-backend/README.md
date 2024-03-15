# Instalação do Backend:

## Pré-requisitos:

- Certifique-se de ter o Docker instalado no seu sistema operacional. Você pode instalar o Docker seguindo as instruções para o seu sistema:
  - [Windows](https://www.docker.com/products/docker-desktop/)
  - [Linux](https://docs.docker.com/engine/install/ubuntu/)

## Configuração do Ambiente:

1. Crie um arquivo `.env` no diretório raiz do projeto.
2. Utilize o arquivo `.env-example` como exemplo para preencher as variáveis de ambiente necessárias.

## Executando o Projeto pela Primeira Vez:

1. Construa os contêineres utilizando o docker-compose:

   ```shell
   docker-compose -f docker-compose-dev.yml up -d --build
   ```

2. Gere o Prisma Client:

   ```shell
   npx prisma generate
   ```

3. Execute a primeira migração do banco de dados:

   ```shell
   npx prisma migrate dev
   ```

4. Inicie o projeto:
   ```shell
   npm run start:dev
   ```

## Executando o Projeto a Partir da Segunda Vez:

1. Inicie os contêineres com o docker-compose:

   ```shell
   docker-compose -f docker-compose-dev.yml up -d
   ```

2. Inicie o projeto:
   ```shell
   npm run start:dev
   ```

## Parando o Projeto:

1. ```shell
    docker-compose -f docker-compose-dev.yml up -d
   ```
