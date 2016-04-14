//Dependencies

var path = require('path');
var multer  = require('multer');
var mime = require('mime');
var fs = require('fs');

var fileMan = require('./fileMan.js');

//Config Paths

var configPaths = require('../config/paths.js');

//Multer Config

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, configPaths.upl)
  },
  filename: function (req, file, cb) {
    //cb(null, Date.now() + '.' + mime.extension(file.mimetype));
    //cb(null, "image" + '.' + mime.extension(file.mimetype));
    console.log(file.originalname);
    cb(null, file.originalname);
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

    compressor.compress(configPaths, function(){
      console.log("File Compressed");


      res.writeHead(200, {'content-type': 'plain/text'});
      res.end('File received and compressed');

      //Clear uploads directory after compression
      fileMan.clearDir(configPaths.upl + '*');
    });

  });

  app.get('/download', function(req, res){
    console.log("DOWNLOAD");

    var imgPath = 'compressed_images/'+req.query.img;
    var stats = fs.statSync(path.resolve('public/'+imgPath));
    var fileSizeInBytes = stats['size'];
    var fileSizeInMb = fileSizeInBytes / 1024;
    fileSizeInMb = +fileSizeInMb.toFixed(2);

    res.writeHead(200, {'content-type': 'text/plain' });
    res.end(JSON.stringify({path: imgPath, size: fileSizeInMb}));

    //Clear compressed_images directory after download
    //fileMan.clearDir(configPaths.dest + '*'); //this is running async so it crashes 
  });

}
