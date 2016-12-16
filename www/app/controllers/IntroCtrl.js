"use strict";

app.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate,$window) {
  $scope.play = () => {
    $window.location.href = "#/user";
  };

});
