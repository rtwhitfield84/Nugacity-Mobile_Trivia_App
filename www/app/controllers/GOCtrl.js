"use strict";

app.controller('GOCtrl', function($scope,AStorage,$window,$state,AuthFactory,UserFactory){
	$scope.score = AStorage.score;
	$scope.users = UserFactory.users;
  $scope.currentUser = AStorage.currentUser;

	$scope.logout = () => {
		AuthFactory.logoutUser();
	};

  $scope.playAgain = () => {
    $state.href("Tquestions");
  };

});
