"use strict";

app.factory('TILStorage',($http,AuthFactory,UFBCreds) =>{


	function getTIL() {
		return new Promise((resolve,reject) => {
			$http.get(`https://www.reddit.com/r/todayilearned/random.json?sort=new&limit=1`)
			.success((fact) => {
				console.log("fact", fact);
				resolve(fact);
			})
			.error((error) => {
				reject(error);
			});
		});
	}

		 let makeMemory = (memory)  => {
	 	console.log("memobj", memory);
	 	return new Promise ((resolve,reject) => {
	 		$http.post(`${UFBCreds.URL}/memories.json`,
	 		angular.toJson(memory))
	 		.success((memory) => {
	 			console.log("memory", memory);
	 			resolve(memory);
	 		})
	 		.error((error) => {
	 			reject(error);
	 		});
	 	});
	 };

	 let getFBMemories = (currentUser) => {
	 	console.log("currentUser FB:", currentUser);
	 	let memories = [];
	 	 	return new Promise ((resolve, reject) => {
	 		$http.get(`${UFBCreds.URL}/memories.json?orderBy="uid"&equalTo="${currentUser}"`)
	 		.success( (obj) => {
			console.log("successobj :", obj);
			let memoryCollection = obj;
			Object.keys(memoryCollection).forEach((key) => {
			memoryCollection[key].id = key;
			memories.push(memoryCollection[key]);
			});
			console.log("memories", memories);
			resolve(memories);
			})
			.error((error) => {
			reject(error);
			});

	 	});
	 };

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


























