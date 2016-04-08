//Module
var app = angular.module('app', ['ngFileUpload']);

//Service
app.service('uploadService', ['Upload', function(Upload){

  var disableDownload = true;

  // this.enableDownload = funtion(){
  //   disableDownload = false;
  // }

  this.uploadFile = function(file){

    return Upload.upload({
      url: '/upload',
      data: { file : file }
    }).then(function(res){
      disableDownload = false;
      console.log('Success ' + res.config.data.file.name + ' uploaded. Response: ' + res.data + ' download: ' + disableDownload);
      //console.log(resp);
      //disableDownload = false;
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
app.controller('mainController', ['$scope', 'uploadService', '$http', function($scope, uploadService, $http){

  $scope.disableDownload = true;// uploadService.disableDownload;
  $scope.downloadedFile;

  $scope.submit = function(){
    if($scope.form.file.$valid && $scope.file){
      console.log('Submit');
      $scope.uploadFile($scope.file);
      //$scope.disableDownload = uploadService.disableDownload;
    }
  };

  $scope.uploadFile = function(file){
    console.log('Upload');
    uploadService.uploadFile(file).then(function(){
      $scope.disableDownload = uploadService.disableDownload;
    });
  };

  $scope.download = function(){
    $http({
      method: 'GET',
      url: '/download'
    }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    console.log(response);
    $scope.downloadedFile = response.data;
    }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    });
  };

}]);
