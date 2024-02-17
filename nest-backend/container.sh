#!/bin/bash

# Verifique se o número correto de argumentos foi fornecido
if [ $# -ne 1 ]; then
    echo "Uso: $0 <nome_do_container>"
    exit 1
fi

# Passe o nome do container como argumento
nome_do_container="$1"

# Obtenha o ID do container pelo nome
container_id=$(docker ps -aqf "name=$nome_do_container")

if [ -z "$container_id" ]; then
    echo "Container '$nome_do_container' não encontrado."
    exit 1
fi

# Exiba informações sobre o container
docker ps -a | grep "$nome_do_container"

# Executa um shell interativo dentro do container Docker
docker exec -it -t "$container_id" sh
   
# Comandos a serem executados dentro do container
#npx prisma generate
#  sleep 5 # Aguarde 5 segundos (ajuste conforme necessário)
# npx prisma migrate dev