
docker ps -a 
docker logs -f --tail 1000 c53e35ef9ebf


docker rm c53e35ef9ebf

docker exec -it e1e1e276488b sh


npx prisma generate
npx prisma migrate dev
