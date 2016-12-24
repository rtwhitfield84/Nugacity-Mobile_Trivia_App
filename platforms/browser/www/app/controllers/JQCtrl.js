"use strict";

app.controller('JQCtrl', function($scope,QStorage,$location,$window,$sce,$sanitize,$timeout,$cordovaToast,$cordovaNativeAudio){

    $cordovaNativeAudio
    .preloadComplex('music', 'audio/jeopartyMusic.mp3', 1, 1)
    .then(function (msg) {
      console.log(msg);
      $scope.play();
    }, function (error) {
      console.error(error);
    });


      $scope.play = function () {
    $cordovaNativeAudio.loop('music');
  };
$scope.play();
  $scope.stop = () => {
    $cordovaNativeAudio.stop('music');
  };

//Broadcast state change so music will
 $scope.$on('$stateChangeStart',
function(event, toState, toParams, fromState, fromParams){
  $scope.stop();
});


    $cordovaToast
     .show('Swipe left to keep the JeoParty going!', 'short', 'center')
     .then(function(success) {
       // success
     }, function (error) {
       // error
     });


	  $scope.getJQ = () =>{
    QStorage.getJQuestions()
    .then((question)=> {
      $scope.Jquestions = question;
      $scope.$apply();
    });
  };

  $scope.getJQ();

});




