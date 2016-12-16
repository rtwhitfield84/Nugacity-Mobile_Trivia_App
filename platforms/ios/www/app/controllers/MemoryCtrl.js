"use strict";

app.controller('MemoryCtrl', function($scope,TILStorage,QStorage,AStorage,UserFactory,AuthFactory,$location,$window,$sce,$sanitize,$timeout){


	$scope.getStoredMemories = () => {
		UserFactory.getFBUser(AuthFactory.getUser())
		.then((user) => {
			console.log("user", user);
		TILStorage.getFBMemories(user[0].uid)
		.then((memories) => {
			console.log("memories", memories);
			$scope.memories = memories;
			console.log("$scope.memories", $scope.memories);
			$scope.$apply();
		});
	});
	};
	$scope.getStoredMemories();

	$scope.forget = ($event) =>{
    console.log("$event",$event);
    let id = $event.target.id;
    console.log("id", id);
		TILStorage.forgetFromFB(id)
		.then((obj) => {
		$scope.getStoredMemories();
		});
	};

});
