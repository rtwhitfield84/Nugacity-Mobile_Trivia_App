"use strict";

app.factory('AStorage', ($http,FBCreds,AuthFactory,$window,QFBCreds) =>{
	let score = 0;
	let previousRoundScore = 0;
  let wrong = ["img/light-bulb-icon.png","img/light-bulb-icon.png","img/light-bulb-icon.png"];
	// let wrong = ["x","x","x"];
  let currentUser;

	let getQuotes = (qNumber) => {
		 qNumber = Math.floor(Math.random()*(24-0+1)+0);
		console.log("qNumber", qNumber);

		return new Promise((resolve,reject) => {
			$http.get(`${QFBCreds.URL}/quotes/${qNumber}.json`)
			.success((qObj) => {
				console.log("qobj", qObj);
			resolve(qObj);
			})
		.error((error) => {
			reject(error);
		});
	});
};
	return {score,wrong,getQuotes,currentUser};
});
