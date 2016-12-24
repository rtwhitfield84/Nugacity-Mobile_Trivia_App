"use strict";

app.factory('UserFactory', function($http,AuthFactory,UFBCreds){

//save user information to firebase
	 let createFBUser = (userObj) => {
  	 	return new Promise ((resolve, reject) => {
  	 		$http.post(`${UFBCreds.URL}/users.json`,
  	 		angular.toJson(userObj))
  	 		.success((obj) => {
  	 			resolve(obj);
  	 	})
  	 		.error((error) => {
  	 			reject(error);
  	 	});

	});
};

//get user from firebase
	 let getFBUser = (currentUser) => {

	 	   let users = [];

  	 	 	return new Promise ((resolve, reject) => {
  	 		$http.get(`${UFBCreds.URL}/users.json?orderBy="uid"&equalTo="${currentUser}"`)
  	 		.success( (obj) => {
  			let userCollection = obj;
  			Object.keys(userCollection).forEach((key) => {
  			userCollection[key].id = key;
  			users.push(userCollection[key]);
  			});
  			resolve(users);
  			})
  			.error((error) => {
  			reject(error);
  			});

  	 	});
	 };

//uodate users high score
	 let updateHighScore = (user)  => {
	 	let id = user.id;
	 	return new Promise ((resolve,reject) => {
	 		$http.patch(`${UFBCreds.URL}/users/${id}.json`,
	 		angular.toJson(user))
	 		.success((user) => {
	 			resolve(user);
	 		})
	 		.error((error) => {
	 			reject(error);
	 		});
	 	});
	 };

//get all users for high score display
	 let getUsers = () => {
	 	return new Promise((resolve,reject) => {
	 		$http.get(`${UFBCreds.URL}/users/.json`)
	 		.success((users) => {
	 			resolve(users);
	 		})
	 		.error((error) => {
	 			reject(error);
	 		});
	 	});
	 };


	 return {createFBUser, getFBUser,updateHighScore,getUsers};

});










