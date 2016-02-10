FROM node:5.5.0
MAINTAINER kogai <kogai0121@gmail.com>
RUN apt-get update

RUN mkdir /kindlized-server
WORKDIR /kindlized-server

ADD package.json /kindlized-server/package.json
RUN npm install

ADD . /kindlized-server

ENV NODE_ENV container
ENV NODE_PATH /kindlized-server/

CMD npm run dev
