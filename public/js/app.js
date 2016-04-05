//Module
var app = angular.module('app', ['ngFileUpload']);

//Directive STUDY
// app.directive('fileModel', ['$parse', function ($parse) {
//             return {
//                restrict: 'A',
//                link: function(scope, element, attrs) {
//                   var model = $parse(attrs.fileModel);
//                   var modelSetter = model.assign;
//
//                   element.bind('change', function(){
//                      scope.$apply(function(){
//                         modelSetter(scope, element[0].files[0]);
//                      });
//                   });
//                }
//             };
// }]);

//Service
// app.service('uploadService', ['$http', function($http){
//   this.uploadToUrl = function(file, uploadUrl){
//     var fd = new FormData();
//     fd.append('file', file);
//
//     $http.post(uploadUrl, fd, {
//       transformRequest: angular.identity,
//       headers: {'Content-Type':undefined}
//     })
//     .success(function(){
//
//     })
//     .error(function(){
//
//     })
//
//   }
// }])

//Controller
app.controller('mainController', ['$scope', 'Upload', function($scope, Upload){

  //upload function
  // $scope.upload = function(){
  //   var file = $scope.myFile;
  //   console.log('File: ');
  //   console.log(file);
  //
  //   var uploadUrl = '/upload';
  //   uploadService.uploadToUrl(file, uploadUrl);
  // };

  $scope.submit = function(){
    if($scope.form.file.$valid && $scope.file){
      $scope.upload($scope.file);
    }
  };

  $scope.upload = function(file){
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
  };

}]);
