"use strict";

app.factory('AStorage', ($http,FBCreds,AuthFactory,$window,QFBCreds) =>{
	let score = 0;
  let wrong = ["img/light-bulb-icon.png","img/light-bulb-icon.png","img/light-bulb-icon.png"];
  let currentUser;


	return {score,wrong,currentUser};
});
