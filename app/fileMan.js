var del = require('delete');

module.exports = {

  //Remove all files from a directory
  remove : function(directory){
    del([directory], function(err){
      if(err) throw err;
      console.log('Files deleted from: ' + directory );
    });
  }

}
