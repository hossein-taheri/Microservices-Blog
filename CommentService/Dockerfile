FROM node:16

WORKDIR /usr/app/

COPY ./package*.json ./

RUN npm install

COPY . .

# set env variables
ENV DB_HOST="mongo_db"
ENV DB_PORT="27017"
ENV DB_DBNAME="comment_service"
ENV JWT_SECRET_KEY="example_secret_key"
ENV RABBIT_MQ_HOST="rabbitmq"
ENV PORT="80"
ENV GRPC_PORT="9090"


CMD [ "node" , "index.js" ]