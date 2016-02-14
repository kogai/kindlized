#!/bin/bash

docker-compose run mongod mongo admin --eval "db.createUser({user: 'admin', pwd: '$KINDLIZED_MONGODB_PASS', roles:[{role:'root',db:'admin'}]});" --host $DOCKER_IP
docker-compose run mongod mongo kindlized --eval "db.createUser({user: 'kindlized', pwd: '$KINDLIZED_MONGODB_PASS', roles:[{role:'readWrite',db:'kindlized'}]});" --host $DOCKER_IP

# docker-compose run mongod mongorestore -h $DOCKER_IP:27017 --db kindlized /tmp/dump

# --authフラグ付ける

docker-compose -f production.yml build mongod
docker-compose -f production.yml up -d mongod

# docker-compose run mongod mongo --host $DOCKER_IP
# docker-compose run mongod mongo admin -u admin -p $KINDLIZED_MONGODB_PASS --host $DOCKER_IP
# docker-compose run mongod mongo kindlized -u kindlized -p $KINDLIZED_MONGODB_PASS --host $DOCKER_IP