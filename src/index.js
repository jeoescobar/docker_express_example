const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mg = require('./database');

const app = express();

//routes
const indexRoutes = require('./routes/index');
//app.use(require('./routes'));


//app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
//app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//app.use('/',)

app.use('/',indexRoutes);

app.listen(3001);
console.log("Server on port", 3001);


