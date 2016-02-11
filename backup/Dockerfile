FROM mongo:3.0.9
MAINTAINER kogai <kogai0121@gmail.com>

ADD dump /tmp/dump
CMD mongorestore -h $DB_HOST:27017 --db kindlized /tmp/dump