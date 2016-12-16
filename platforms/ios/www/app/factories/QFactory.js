"use strict";

app.factory('QStorage',($http,FBCreds,TFBCreds,AuthFactory) =>{


	let getJQuestions = (qNumber) => {
		 qNumber = Math.floor(Math.random()*(9999-9099+1)+9099);
		// console.log("qNumber", qNumber);

		return new Promise((resolve,reject) => {
			$http.get(`${FBCreds.URL}/${qNumber}.json`)
			.success((qObj) => {
				// console.log("qObj", qObj);
			resolve(qObj);
			})
		.error((error) => {
			reject(error);
		});	
	});
};

	function getTQuestions() {
		console.log("happened");
		let tQNumber = Math.floor(Math.random()*(9999-9099+1)+9099);
		 // console.log("tQNumber", tQNumber);
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

function globalGetTQuestions() {
	getTQuestions().
	then((question) => {
	let correctAnswer = question.answer;
	console.log("correctAnswer", correctAnswer);
	let correctAnswerId = correctAnswer;
	let Tquestions = question.question;
	console.log("Q", Tquestions);
	let randomize = question.choices;
	// randomize = $scope.shuffle($scope.randomize);
});	
}

	return {getJQuestions,getTQuestions, globalGetTQuestions};
});

