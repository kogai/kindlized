#!/bin/bash

if [ "$NODE_ENV" = "development" ]; then
	node-dev --debug bin/www
	node-dev --all-deps db
else
	pm2 restart all
fi
