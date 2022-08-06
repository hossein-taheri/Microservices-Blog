const express = require("express");
const app = express();

//request config
require('./bootstrap/request')(app);

//database config
require('./bootstrap/database');

//routing config
require('./bootstrap/router')(app);

//404 config
require('./bootstrap/not_found')(app);

//error handler
require('./bootstrap/error_handler')(app);

//listening config
require('./bootstrap/listening')(app);

//listening config
require('./bootstrap/grpc_listening');

//message broker listening config
require('./bootstrap/message_broker');