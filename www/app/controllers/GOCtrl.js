"use strict";

app.controller('GOCtrl', function($scope,QStorage,AStorage,$location,$window,$sce,$sanitize,AuthFactory,UserFactory){
	$scope.score = AStorage.score;
	$scope.users = UserFactory.users;
  $scope.currentUser = AStorage.currentUser;
  console.log("$scope.currentUser",$scope.currentUser );

	// AStorage.getQuotes()
	// .then((q) => {
	// 	console.log("q", q);
	// 	$scope.quote = q;
	// 	console.log("$scopequotes",$scope.quote.quote);
	// });

	$scope.logout = () => {
		AuthFactory.logoutUser();
	};

$scope.playAgain = () => {
  $state.href("Tquestions");
  // $window.location.reload();
  // $window.location.href = "#Tquestions";
};

});
