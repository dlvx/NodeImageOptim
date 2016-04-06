//Module
var app = angular.module('app', ['ngFileUpload']);

//Service
app.service('uploadService', ['Upload', function(Upload){

  var disableDownload = true;

  this.uploadFile = function(file){
    Upload.upload({
      url: '/upload',
      data: { file : file }
    }).then(function(resp){
      console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
      console.log(resp);
      disableDownload = false;
    },function(resp){
      console.log('Error status: ' + resp.status);
    },function(evt){
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
  }
}]);

//Controller
app.controller('mainController', ['$scope', 'uploadService', '$http', function($scope, uploadService, $http){

  $scope.disableDownload = true;// uploadService.disableDownload;

  $scope.submit = function(){
    if($scope.form.file.$valid && $scope.file){
      console.log('Submit');
      $scope.uploadFile($scope.file);
      $scope.disableDownload = uploadService.disableDownload;
    }
  };

  $scope.uploadFile = function(file){
    console.log('Upload');
    uploadService.uploadFile(file);
  };

  $scope.download = function(){
    $http({
      method: 'GET',
      url: '/download'
    }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    });
  };

}]);
