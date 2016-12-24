"use strict";

app.controller('UserCtrl', function($scope, AuthFactory, UserFactory,$window,$cordovaToast){
	$scope.account = {
		name: '',
		email: '',
		password: '',
		highScore: 0
	};

	$scope.register = () => {
	AuthFactory.createUser($scope.account)
	.then((userObj) => {
		$scope.account.uid = userObj.uid;
	UserFactory.createFBUser($scope.account)
	.then((user)=> {
	$window.location.href = '#/main';
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
  AuthFactory.loginUser($scope.account)
	.then((userData) => {
    UserFactory.getFBUser(userData.uid)
    .then((user) => {
      $scope.currentUserName = user[0].name;
  $cordovaToast
     .show('Welcome Back, ' + $scope.currentUserName +'!', 'short', 'center')
     .then(function(success) {
		$window.location.href = '#/main';
       // success
     }, function (error) {
       // error
     });
    });
  })
  .catch( function onRejected (error)  {
      $cordovaToast
      .show('Please enter the email and password associated with your account', 'long', 'center')
      .then(function(success) {
      // success
      }, function (error) {
      // error
      });
   });
  };

});
















