"use strict";

app.factory('AuthFactory',function(){

	let currentUser = null;

	let createUser = function(userObj) {

		return firebase.auth().createUserWithEmailAndPassword(userObj.email,userObj.password)
    .catch((error) => {
      throw error;
    });
	};

	let loginUser = function(userObj) {

		return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
    .catch((error) => {
      throw error;
    });

	};

	let logoutUser = function() {

		return firebase.auth().signOut();

	};

	let isAuthenticated = function() {

	return new Promise((resolve,reject) => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				currentUser = user.uid;
				resolve(true);
			} else {
				resolve(false);
			}
		});
	});
};

	let getUser = () => {

		return currentUser;
	};

	return {createUser, loginUser, logoutUser, isAuthenticated, getUser, currentUser};
});
