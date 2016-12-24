"use strict";

app.controller('TILCtrl', function($scope,TILStorage,UserFactory,AuthFactory,$location,$window,$sce,$sanitize,$filter,$cordovaToast){

//get til facts
	  $scope.getFacts = () => {

      //set current date and time for memeory
  	   $scope.date = $filter('date')(new Date(), 'medium');

  	   TILStorage.getTIL()
  	   .then((fact) => {
  	  	$scope.TIL = fact[0].data.children[0].data;
  	  	$location.url('TIL');
  	  	$scope.$apply();
  	  	UserFactory.getFBUser(AuthFactory.getUser())
  		.then((user) =>{
  		  $scope.uid = user[0].uid;
      //create memory object
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

  //store memory object to user firebase
	  $scope.remember = () => {
	  	TILStorage.makeMemory($scope.memory);
	  };

  //get user memories from firebase
	  $scope.getMemories = () => {
	  	$window.location.href = '#/memories';
	  };


});
