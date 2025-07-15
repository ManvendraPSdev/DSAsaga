#!/bin/bash

echo "Starting your server..."

cd /home/ubuntu/dsasaga
npm install -g pm2
cd server
pm2 stop all
pm2 start server.js
