#!/bin/bash

if [ "$NODE_ENV" = "development" ]; then
	node-dev --debug bin/www
else
	pm2 restart all
fi
