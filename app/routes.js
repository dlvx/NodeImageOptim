//Dependencies

var path = require('path');
var multer  = require('multer');
var mime = require('mime');

var fileMan = require('./fileMan.js');

//Config Paths

var configPaths = require('../config/paths.js');

//Multer Config

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, configPaths.upl)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' + mime.extension(file.mimetype));
    //cb(null, Date.now() + '.png');
  }
});
var upload = multer({ storage: storage });

//Module

module.exports = function(app, compressor){

  app.get('/', function(req, res){
    res.sendFile(path.resolve('public/views/index.html'));
  });

  app.post('/upload', upload.single('file'), function(req, res, next){
    console.log(req.file);
    compressor(configPaths, fileMan.remove);
  });

}
