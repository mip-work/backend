docker system prune
docker image prune -a
docker rm -vf $(docker ps -aq)
docker rmi -f $(docker images -aq)
docker images
docker system prune --all --force --volumes
docker ps -a 