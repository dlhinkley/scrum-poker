FROM node:13

WORKDIR /home/node

RUN apt-get update -q &&  apt-get install -y -qq firefox-esr

 

