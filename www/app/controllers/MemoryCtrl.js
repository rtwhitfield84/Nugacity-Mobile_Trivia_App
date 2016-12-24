"use strict";

app.controller('MemoryCtrl', function($scope,TILStorage,QStorage,AStorage,UserFactory,AuthFactory,$location,$window,$sce,$sanitize,$timeout){

//get user saved facts
	$scope.getStoredMemories = () => {

  		UserFactory.getFBUser(AuthFactory.getUser())
  		.then((user) => {
  		TILStorage.getFBMemories(user[0].uid)
  		.then((memories) => {
  			$scope.memories = memories;
  			$scope.$apply();
  		});
  	});
	};

	$scope.getStoredMemories();

//delete user saved fact
	$scope.forget = ($event) =>{

    let id = $event.target.id;

		  TILStorage.forgetFromFB(id)
		  .then((obj) => {
		  $scope.getStoredMemories();
		});
	};

});
