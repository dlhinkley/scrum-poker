FROM node:13

RUN mkdir /usr/src/app 
 
WORKDIR /usr/src/app

RUN npm install -g @angular/cli 

 

