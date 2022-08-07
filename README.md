# Microservices-Blog

a backend-side Simple Blog based on Microservices ( NodeJS + MongoDB )

- uses JWT for authentication
- uses RabbitMQ as Message Broker
- uses REST for user APIs ( SPA or mobile apps )
- uses gRPC for synchronous communication between microservices

#### Microservices
1. Auth Service:
  Register, Login, and Refresh JWT Tokens' endpoints are in this Service.
1. Post Service:
  Create posts,  Index all posts, and Show a single post (with the post's comments) endpoints are in this Service.
1. Comment Service:
  Create comments endpoint is in this Service.

## Diagrams
<img src="/Microservices.jpg" width="100%">

## Run Project
 ```docker-compose up --build```
