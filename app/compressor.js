//Dependencies
var Imagemin = require('imagemin');
var imageminPngquant = require('imagemin-pngquant');

module.exports = function(configPaths){

  //Start image optimization instance
  new Imagemin()
    //Image optimization settings
    .src(configPaths.src) //path to the images source directory, will grab every .png file in that directory
    .dest(configPaths.dest) //destination folder for the compressed images
    .use(imageminPngquant({quality: '65-80', speed: 4})) //using pngquant optimization plugin
    //Optimize files using the given settings
    .run(function(err, files){
      if(err){
        console.log(err);
      }
      console.log(files[0]);
    });
  
}
