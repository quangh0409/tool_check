FROM node:16 

WORKDIR /app  

COPY . /app

RUN cp .env

RUN npm install  
EXPOSE 	3000  

ENV NODE_TLS_REJECT_UNAUTHORIZED 0
CMD node SOC_API.js
