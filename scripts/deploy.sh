#!/bin/bash

export MACHINE_NAME="kindlized-docker"
export DOCKER_IP=$(docker-machine ip $MACHINE_NAME)

cd client && NODE_ENV=production npm run build && cd ../
cp -r client/public/ server/public

eval "$(docker-machine env $MACHINE_NAME)"

echo Deploy to $(docker-machine active) on $DOCKER_IP

docker-compose -f production.yml build server
docker-compose -f production.yml up -d server
