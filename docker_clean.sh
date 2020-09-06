#!/usr/bin/env bash

# Stop all containers
docker stop `docker ps -qa`

# Remove all containers
docker rm `docker ps -qa`

# Remove all images
docker rmi -f `docker images -qa `

# Remove all volumes
docker volume rm $(docker volume ls -qf)

# docker-compose up -d
