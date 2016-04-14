//Dependencies
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public')); //set the static files location

//Load the configuration paths file
var paths = require('./config/paths.js');

//Load the file manager
var fileMan = require('./app/fileMan.js');

//Verify that the uploads and compressed_images directories exist
fileMan.verifyDir(paths.upl);
fileMan.verifyDir(paths.dest);

//Load the compressor
var compressor = require('./app/compressor.js');

//Routes
require('./app/routes.js')(app, compressor);

//launch
app.listen(port, function(){
  console.log('App listening on port '+port);
});
