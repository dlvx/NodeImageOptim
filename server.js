//Dependencies
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

//Config
var configPaths = require('./config/paths.js');

//Load the compressor
var compressor = require('./app/compressor.js');

//Routes
require('./app/routes.js')(app, compressor, configPaths);

//launch
app.listen(port, function(){
  console.log('App listening on port '+port);
});
