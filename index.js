//Enviroment varibles
require('dotenv').config();

//Config express
const express = require('express');
const app = express();

//Database connection
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => console.log(err));

//Config body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Config express-formidable
const formidable = require('express-formidable');
app.use(formidable({
   uploadDir: './static/image',
   keepExtensions: true,
   maxFieldsSize: 1024 * 1024, //1MB
   multiples: false
}));

//Config static file
const path = require('path');
app.use('/public', express.static(path.join(__dirname, 'static/image')));

//Routers
const api = require('./app/routes/api');
app.use('/api', api);

//Start server
app.listen(process.env.PORT, () => console.log('Server is listening port ' + process.env.PORT));


