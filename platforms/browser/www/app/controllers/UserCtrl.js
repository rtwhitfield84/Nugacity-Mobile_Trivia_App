"use strict";

app.controller('UserCtrl', function($scope, AuthFactory, UserFactory,$window,$cordovaToast){
	$scope.account = {
		name: '',
		email: '',
		password: '',
		highScore: 0
	};

	$scope.register = () => {
    console.log("$scope.account", $scope.account);
	AuthFactory.createUser($scope.account)
	.then((userObj) => {
		$scope.account.uid = userObj.uid;
	UserFactory.createFBUser($scope.account)
	.then((user)=> {
	$window.location.href = '#/main';
		console.log("user",user);
    $cordovaToast
     .show('Welcome to Nugacity, ' + $scope.account.name +'!', 'long', 'center')
     .then(function(success) {
       // success
     }, function (error) {
       // error
     });
  })
  .catch(function onRejected(error) {
      $cordovaToast
      .show('Please enter a valid email and password at least six characters long', 'long', 'center')
      .then(function(success) {
      // success
      }, function (error) {
      // error
      });
   });

	});
	};

	$scope.login = () => {
  console.log("$scope.account", $scope.account);
  AuthFactory.loginUser($scope.account)
	.then((userData) => {
    console.log("userData", userData);
    UserFactory.getFBUser(userData.uid)
    .then((user) => {
      console.log("user ctrl:", user);
      $scope.currentUserName = user[0].name;
      console.log("$scope.currentUserName",$scope.currentUserName);
    });
		$window.location.href = '#/main';
  $cordovaToast
     .show('Welcome Back, ' + $scope.currentUserName +'!', 'short', 'center')
     .then(function(success) {
       // success
     }, function (error) {
       // error
     });
  })
  .catch( function onRejected (error)  {
      $cordovaToast
      .show('Please enter a valid email and password at least six characters long', 'long', 'center')
      .then(function(success) {
      // success
      }, function (error) {
      // error
      });
   });
  };

});
















