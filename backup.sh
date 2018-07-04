#!/bin/sh
DIR=`date +%d%m%Y`
DEST=backups/$DIR
mkdir -p $DEST
mongodump -h localhost -d basic-oms -o $DEST
