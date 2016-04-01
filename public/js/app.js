//Module
var app = angular.module('app', []);

//Directive STUDY
app.directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;

                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
}]);

//Service
app.service('uploadService', ['$http', function($http){
  this.uploadToUrl = function(file, uploadUrl){
    var fd = new FormData();
    fd.append('file', file);

    $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type':undefined}
    })
    .success(function(){

    })
    .error(function(){

    })

  }
}])

//Controller
app.controller('mainController', ['$scope', 'uploadService', function($scope, uploadService){

  //upload function
  $scope.upload = function(){
    var file = $scope.myFile;
    console.log('File: ');
    console.log(file);

    var uploadUrl = '/upload';
    uploadService.uploadToUrl(file, uploadUrl);
  };

}]);
