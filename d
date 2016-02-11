#!/bin/bash

if [ $# -lt 1 ]
then
  echo "Usage : $0 command"
  echo "Commands:"
  echo ""
  echo "rmiall - Remove all the docker images."
  echo "clean - Remove all worthless images like old cache."
  echo "npm [server/client] [command] - run npm command."
  echo "exit - Stop and Remove Docker Processes. Run this command when you quit."
  echo ""
  exit
fi

case "$1" in

rmiall) echo "Removing All the Docker Images"
    sh scripts/rmiall.sh
    ;;
clean) echo "Removing All Worthless Images"
    sh scripts/clean.sh
    ;;
npm) echo "run npm command"
    node scripts/npm $*
    ;;
exit) echo "Exiting..."
    sh scripts/exit.sh
    ;;
*) echo "Command not known"
    ;;
esac
