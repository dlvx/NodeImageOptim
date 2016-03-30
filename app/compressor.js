//Dependencies
var Imagemin = require('imagemin');
var imageminPngquant = require('imagemin-pngquant');

//Start image optimization instance
new Imagemin()
  //Image optimization settings
  .src('images/*.png') //path to the images source directory, will grab every .png file in that directory
  .dest('build/images') //destination folder for the compressed images
  .use(imageminPngquant({quality: '65-80', speed: 4})) //using pngquant optimization plugin
  //Optimize files using the given settings
  .run(function(err, files){
    if(err){
      console.log(err);
    }
    console.log(files[0]);
  });
