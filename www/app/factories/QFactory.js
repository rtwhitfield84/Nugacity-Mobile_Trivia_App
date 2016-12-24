"use strict";

app.factory('QStorage',($http,FBCreds,TFBCreds,AuthFactory) =>{

//get jeopardy questions from firebase
	let getJQuestions = (qNumber) => {

    //generates random number between 9000 and 10000 to target question key
		 qNumber = Math.floor(Math.random()*(9999-9099+1)+9099);

		return new Promise((resolve,reject) => {
			$http.get(`${FBCreds.URL}/${qNumber}.json`)
			.success((qObj) => {
			resolve(qObj);
			})
		.error((error) => {
			reject(error);
		});
	});
};

// get trivia questions from firebase
	function getTQuestions(tQNumber) {

      //generates random number between 9000 and 10000 to target question key
      tQNumber = Math.floor(Math.random()*(9999-9099+1)+9099);
    	return new Promise((resolve,reject)=> {
    		$http.get(`${TFBCreds.URL}/${tQNumber}.json`)
    		.success((question) => {
    			resolve(question);
    		})
  		.error((error) => {
  			reject(error);
		});
	});
}


	return {getJQuestions,getTQuestions, globalGetTQuestions};
});

