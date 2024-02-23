FROM node:18

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i

ENV HOST_NAME_XYZ=10.2.0.0
ENV DOCKERIZED=YES

COPY ./ ./

EXPOSE 3002 

CMD ["npm", "run", "prod"]