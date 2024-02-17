Instalar:

```bash
apt install docker
apt install docker-compose
sudo chown $USER /var/run/docker.sock 
sudo groupadd docker 
sudo usermod -aG docker $USER
```
No express-backend copie o .env-example .env
```bash
cd express-backend
cp .env.example .env
```
<hr>

##Executando o projeto pela 1ª faça os seguintes passos:

```bash
docker-compose up --build -d
sh container.sh express-backend_app
```
apos entrar no container execute:
```bash 
npx prisma migrate dev
```
apos executar o comando acima
```bash
npm run dev:windows/dev:linux
``` 

<hr>
##Executando o projeto a partir da 2ª vez faça os seguintes passos:

```bash
docker-compose up -d
sh container.sh express-backend_app
npm run dev:windows/dev:linux
```