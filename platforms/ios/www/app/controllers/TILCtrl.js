// "use strict";

app.controller('TILCtrl', function($scope,TILStorage,UserFactory,AuthFactory,$location,$window,$sce,$sanitize,$filter,$cordovaToast){

  // $scope.toasty = () => {
  //   $cordovaToast
  //    .show('Swipe left for more facts. Add to your Nooguts by pressing the + button or view your saved Nooguts by pressing the noggin tenant button', '7000', 'top')
  //    .then(function(success) {
  //      // success
  //    }, function (error) {
  //      // error
  //    });
  //  };
// $scope.toasty();

	  $scope.getFacts = () => {

	   $scope.date = $filter('date')(new Date(), 'medium');
	   console.log("$scope.dateafterf",$scope.x);
	  TILStorage.getTIL()
	  .then((fact) => {
	  	$scope.TIL = fact[0].data.children[0].data;
	  	$scope.created = fact[0].data.children[0].data.created_utc;
	  	console.log("$scope.created",$scope.created);
	  	$location.url('TIL');
	  	$scope.$apply();
	  	UserFactory.getFBUser(AuthFactory.getUser())
		.then((user) =>{
		console.log("usertil", user[0].uid);
		$scope.uid = user[0].uid;
		console.log("$scope.uid", $scope.uid);
		$scope.memory = {
		title: $scope.TIL.title,
		thumbnail: $scope.TIL.thumbnail,
		url: $scope.TIL.url,
		uid: $scope.uid,
		saved: $scope.date
		};
	});
});
};

$scope.getFacts();

	  $scope.remember = () => {
	  	console.log("$event", $scope.memory);
	  	TILStorage.makeMemory($scope.memory);
	  };

	  $scope.getMemories = () => {
	  	$window.location.href = '#/memories';
	  };


});
