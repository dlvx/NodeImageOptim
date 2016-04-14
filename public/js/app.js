//Module
var app = angular.module('app', ['ngFileUpload']);

//Service
app.service('uploadService', ['Upload', function(Upload){

  var disableDownload = true;

  this.uploadFile = function(file){

    return Upload.upload({
      url: '/upload',
      data: { file : file }
    }).then(function(res){
      disableDownload = false;
      //console.log(res);
      console.log('Success ' + res.config.data.file.name + ' uploaded. Response: ' + res.data );
      return res;
    },function(res){
      console.log('Error status: ' + res.status);
      return res;
    },function(evt){
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      return evt;
    });
  }
}]);

//Controller
app.controller('mainController', ['$scope', 'uploadService', '$http',  function($scope, uploadService, $http){

  $scope.disableUpload = false;
  $scope.disableDownload = true;
  $scope.fileName = '';
  $scope.downloadedFile;
  $scope.downloadFileSize;
  $scope.stat = '';

  $scope.submit = function(){
    if($scope.form.file.$valid && $scope.file){
      if($scope.file.mimetype != 'image/png'){
        $scope.disableUpload = true;
      }
      console.log('Submit');
      $scope.fileName = $scope.file.name;
      console.log('NAME ' + $scope.fileName);
      $scope.uploadFile($scope.file);
      $scope.stat = 'Compressing';
    }
  };

  $scope.uploadFile = function(file){
    console.log('Upload');
    uploadService.uploadFile(file).then(function(){
      $scope.disableDownload = uploadService.disableDownload;
      $scope.stat = 'File Compressed';
      $scope.downloadFileSize = uploadService.downloadFileSize;
    });
  };

  $scope.download = function(){
    $http({
      method: 'GET',
      url: '/download',
      params: {
        img : $scope.fileName
      }
    }).then(function successCallback(response) {
      $scope.disableDownload = true;
      $scope.downloadedFile = response.data.path;
      $scope.downloadFileSize = response.data.size;
    }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    });
  };

  $scope.clear = function(){
    $scope.downloadedFile = '';
    $scope.downloadFileSize = '';
  }

}]);
