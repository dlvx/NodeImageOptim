module.exports = function(app, compressor, configPaths){
  app.get('/', function(req, res){
    compressor(configPaths);
  });
}
