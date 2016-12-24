"use strict";

app.controller('MainCtrl', function($scope,QStorage,$location,$window,AuthFactory,UserFactory,$cordovaToast){

  UserFactory.getUsers()
  .then((userObj) => {
    console.log("userObj main", userObj);
  });

	$scope.logout = () => {
		console.log("logout");
		AuthFactory.logoutUser();
		$window.location.href = '#/user';
	};

  $scope.trivia = () => {
    $window.location.href  = "#/Tquestions";
  };

  $scope.jeoparty = () => {
    $window.location.href  = "#/Jquestions";
  };

  $scope.til = () => {
    $cordovaToast
     .show('Swipe left for more facts. Add to your Nooguts by pressing the + button or view your saved Nooguts by pressing the noggin tenant button', '7000', 'top')
     .then(function(success) {
       // success
    $window.location.href  = "#/TIL";
     }, function (error) {
       // error
     });
  };

    $scope.home = () => {
    $window.location.href  = "#/main";
  };
});

