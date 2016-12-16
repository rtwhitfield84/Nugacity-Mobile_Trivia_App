"use strict";

app.factory('UserFactory', function($http,AuthFactory,UFBCreds){
	 let users = [];
	 console.log("usersuf", users);

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

	 let getFBUser = (currentUser) => {
	 	console.log("currentUser FB:", currentUser);
	 	let users = [];
	 	 	return new Promise ((resolve, reject) => {
	 		$http.get(`${UFBCreds.URL}/users.json?orderBy="uid"&equalTo="${currentUser}"`)
	 		.success( (obj) => {
			console.log("successobj :", obj);
			let userCollection = obj;
			Object.keys(userCollection).forEach((key) => {
			userCollection[key].id = key;
			users.push(userCollection[key]);
			});
			console.log("users", users);
			resolve(users);
			})
			.error((error) => {
			reject(error);
			});
	 	
	 	});
	 };

	 let updateHighScore = (user)  => {
	 	console.log("userbrgupdate", user);
	 	let id = user.id;
	 	console.log("id", id);
	 	return new Promise ((resolve,reject) => {
	 		$http.patch(`${UFBCreds.URL}/users/${id}.json`,
	 		angular.toJson(user))
	 		.success((user) => {
	 			console.log("user", user);
	 			resolve(user);
	 		})
	 		.error((error) => {
	 			reject(error);
	 		});
	 	});
	 };

	 let getUsers = () => {
	 	console.log("getusers");
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

// https://nugacityusers.firebaseio.com/users.json?orderBy="uid"&equalTo=HKSaQlf4mwdf36OLfoDnFRF5P0i1

	 return {createFBUser, getFBUser,updateHighScore,getUsers};

});








	 			
	 			