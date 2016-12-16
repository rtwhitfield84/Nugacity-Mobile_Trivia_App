"use strict";

app.controller('JQCtrl', function($scope,QStorage,$location,$window,$sce,$sanitize,$timeout,$cordovaToast){

    $cordovaToast
     .show('Swipe left to keep the Jeoparty going!', 'long', 'bottom')
     .then(function(success) {
       // success
     }, function (error) {
       // error
     });

//     var media = new Media("sounds/something.mp3", null, mediaError);
// media.play();


	  $scope.getJQ = () =>{
      // $scope.$apply();
    QStorage.getJQuestions()
    .then((question)=> {
      $scope.Jquestions = question;
      $scope.$apply();
    });
  };

  $scope.getJQ();

});




