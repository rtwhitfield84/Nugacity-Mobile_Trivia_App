"use strict";

app.controller('JQCtrl', function($scope,QStorage,$location,$window,$sce,$sanitize,$cordovaToast,$cordovaNativeAudio){

//jeoparty mode music load
$cordovaNativeAudio
  .preloadComplex('music', 'audio/jeopartyMusic.mp3', 1, 1)
  .then(function (msg) {
    $scope.play();
    }, function (error) {
});


$scope.play = function () {
  $cordovaNativeAudio.loop('music');
};
$scope.play();

$scope.stop = () => {
  $cordovaNativeAudio.stop('music');
};

//Broadcast state change so music will stop on view change
$scope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
  $scope.stop();
});

//give user jeoparty intstructions
$cordovaToast
  .show('Swipe left to keep the JeoParty going!', 'short', 'center')
  .then(function(success) {
  // success
  }, function (error) {
  // error
});

//jeoparty questions getter
$scope.getJQ = () =>{
  QStorage.getJQuestions()
    .then((question)=> {
    $scope.Jquestions = question;
    $scope.$apply();
  });
};

$scope.getJQ();

});




