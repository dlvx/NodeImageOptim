//Dependencies
var Imagemin = require('imagemin');
var imageminPngquant = require('imagemin-pngquant');


module.exports = {

  compress: function(configPaths, callback){

    //Start image optimization instance
    new Imagemin()
      //Image optimization settings
      .src(configPaths.src) //path to the images source directory, will grab every .png file in that directory
      .dest(configPaths.dest) //destination folder for the compressed images
      .use(imageminPngquant({quality: '85-95', speed: 3})) //using pngquant optimization plugin
      //Optimize files using the given settings
      .run(function(err, files){
        if(err){
          console.log(err);
        }
        console.log(files[0]);
        callback();
        //remove(configPaths.src);
      });

  }

}
