
instalar apt install docker
instalar apt install docker-compose
sudo chown $USER /var/run/docker.sock 


no express-backend copie o .env-exemple .env

docker-compose up 

execute 
sh container.sh express-backend_app

apos entrar no container execute:
npx prisma migrate dev

apos executar o comando acima

npm run dev