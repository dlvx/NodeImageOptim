var fs = require('fs');
var del = require('delete');

module.exports = {

  //This is to verify the existence of a directory, if it doesn't exist, the directory is created
  //Used to verify the existence of the uploads and compressed_images directories
  verifyDir : function(directory){
    if(!fs.existsSync(directory)){
      fs.mkdirSync(directory);
      console.log(directory + ' : CREATED');
    }else{
      console.log(directory + ' : OK');
    }

  },

  //Remove all files from a directory
  clearDir : function(directory){
    del([directory], function(err){
      if(err) throw err;
      console.log('Files deleted from: ' + directory );
    });
  }

}
