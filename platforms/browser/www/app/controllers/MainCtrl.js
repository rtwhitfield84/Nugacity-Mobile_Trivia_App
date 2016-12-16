"use strict";

app.controller('MainCtrl', function($scope,QStorage,$location,$window,AuthFactory,UserFactory){

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
    $window.location.href  = "#/TIL";
  };

    $scope.home = () => {
    $window.location.href  = "#/main";
  };
});

