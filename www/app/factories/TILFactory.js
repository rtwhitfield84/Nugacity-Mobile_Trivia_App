"use strict";

app.factory('TILStorage',($http,AuthFactory,UFBCreds) =>{

//get facts from til
	function getTIL() {
		return new Promise((resolve,reject) => {
			$http.get(`https://www.reddit.com/r/todayilearned/random.json?sort=new&limit=1`)
			.success((fact) => {
				resolve(fact);
			})
			.error((error) => {
				reject(error);
			});
		});
	}

  //save user facts to firebase
		 let makeMemory = (memory)  => {
  	 	return new Promise ((resolve,reject) => {
  	 		$http.post(`${UFBCreds.URL}/memories.json`,
  	 		angular.toJson(memory))
  	 		.success((memory) => {
  	 			resolve(memory);
  	 		})
  	 		.error((error) => {
  	 			reject(error);
  	 		});
  	 	});
	 };

//get users saved facts
	 let getFBMemories = (currentUser) => {

	 	 let memories = [];

  	 	 	return new Promise ((resolve, reject) => {
  	 		$http.get(`${UFBCreds.URL}/memories.json?orderBy="uid"&equalTo="${currentUser}"`)
  	 		.success( (obj) => {
  			let memoryCollection = obj;
  			Object.keys(memoryCollection).forEach((key) => {
  			memoryCollection[key].id = key;
  			memories.push(memoryCollection[key]);
  			});
  			resolve(memories);
  			})
  			.error((error) => {
  			reject(error);
  			});

  	 	});
	 };

//delete users saved fact from firebase
		let forgetFromFB = (id) =>{
  		return new Promise((resolve,reject) => {
  			$http.delete(`${UFBCreds.URL}/memories/${id}.json`)
  			.success((forgotten) => {
  				resolve(forgotten);
  			})
  			.error((error) => {
  				reject(error);
  			});
  		});
		};



	return {getTIL,makeMemory,getFBMemories,forgetFromFB};
});


























