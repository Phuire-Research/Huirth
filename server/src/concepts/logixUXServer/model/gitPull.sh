#!/bin/bash
echo 'ATTEMPTING TO PULL THIS DIRECTORY: $1'
cd $1
git pull
exit