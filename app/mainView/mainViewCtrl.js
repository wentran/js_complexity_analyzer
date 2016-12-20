'use strict';

angular.module('myApp')
.controller('mainViewCtrl', ['$scope', "jsComplexity", 
 function($scope, jsComplexity) {

  $scope.reset = function() {
    $scope.jsCode = "//Paste your code here"
  }

  $scope.checkJSCode = function (code) {
    $scope.checkResult = jsComplexity.evaluate(code);
  };
  
  $scope.reset();

}]);