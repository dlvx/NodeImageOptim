//Module
var app = angular.module('app', ['ngFileUpload']);

//Service
app.service('uploadService', ['Upload', function(Upload){
  this.uploadFile = function(file){
    Upload.upload({
      url: '/upload',
      data: { file : file }
    }).then(function(resp){
      console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    },function(resp){
      console.log('Error status: ' + resp.status);
    },function(evt){
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
  }
}]);

//Controller
app.controller('mainController', ['$scope', 'uploadService', function($scope, uploadService){

  $scope.submit = function(){
    if($scope.form.file.$valid && $scope.file){
      console.log('Submit');
      $scope.uploadFile($scope.file);
    }
  };

  $scope.uploadFile = function(file){
    console.log('Upload');
    uploadService.uploadFile(file);
  };

}]);
