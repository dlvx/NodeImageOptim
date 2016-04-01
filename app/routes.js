var path = require('path');

module.exports = function(app, compressor, configPaths){
  app.get('/', function(req, res){
    res.sendFile(path.resolve('public/views/index.html'));
  });

  app.post('/upload', function(req, res){
    console.log(req.files);
    //console.log("upload");
  });
}
