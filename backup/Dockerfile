FROM mongo:3.0.9
MAINTAINER kogai <kogai0121@gmail.com>

ADD dump /tmp/dump
CMD mongorestore -h $DOCKER_IP:27017 --db kindlized /tmp/dump