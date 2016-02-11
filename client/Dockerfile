FROM node:5.5.0
MAINTAINER kogai <kogai0121@gmail.com>
RUN apt-get update

RUN mkdir /kindlized-client
WORKDIR /kindlized-client

ADD package.json /kindlized-client/package.json
RUN npm install

ADD . /kindlized-client

ENV NODE_ENV container
ENV NODE_PATH /kindlized-client

ENTRYPOINT ["npm", "run", "dev"]
