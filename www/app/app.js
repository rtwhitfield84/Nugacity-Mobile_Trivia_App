"use strict";

var app = angular.module('nugacity', ['timer', 'ngSanitize','ionic','ngCordova',]);

//check if user is logged in

let isAuth = (AuthFactory,$window) => new Promise((resolve,reject)=> {
	AuthFactory.isAuthenticated()
	.then((userExists) => {
		if (userExists) {
			let currentUser = AuthFactory.getUser();
			resolve();
		} else {
			$window.location.href = '#/';
		}
	});
});



app.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider) {

//prevent ionic cacheing
$ionicConfigProvider.views.maxCache(0);


  $stateProvider
  .state('intro', {
    url: '/',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  })
  .state('main', {
    url: '/main',
    templateUrl: 'partials/main.html',
    controller: 'MainCtrl',
    resolve: {isAuth}
  })
  .state('trivia', {
    url: '/Tquestions',
    templateUrl: 'partials/Tquestions.html',
    controller: 'TQCtrl'
  })
  .state('jeoparty', {
    url: '/Jquestions',
    templateUrl: 'partials/Jquestions.html',
    controller: 'JQCtrl'
  })
  .state('gameOver', {
    url: '/gameOver',
    templateUrl: 'partials/gameOver.html',
    controller: 'GOCtrl'
  })
  .state('user', {
    url: '/user',
    templateUrl: 'partials/user.html',
    controller: 'UserCtrl'
  })
  .state('til', {
    url: '/TIL',
    templateUrl: 'partials/TIL.html',
    controller: 'TILCtrl'
  })
  .state('memories', {
    url: '/memories',
    templateUrl: 'partials/memories.html',
    controller: 'MemoryCtrl'
  });
$urlRouterProvider.otherwise('/');
});

//date filter
app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});


//firebase initialization
app.run(($location, UFBCreds) => {
	let creds = UFBCreds;
	let authConfig = {
		apiKey: creds.apiKey,
		authDomain: creds.authDomain
	};

	firebase.initializeApp(authConfig);
	});

//custom directive for no image result in til view

app.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  };
});



























/*prior to change*/



// "use strict";

// var app = angular.module('nugacity', ['ngRoute', 'timer', 'ngSanitize','ionic','ngCordova']);

// let isAuth = (AuthFactory,$window) => new Promise((resolve,reject)=> {
//   AuthFactory.isAuthenticated()
//   .then((userExists) => {
//     if (userExists) {
//       let currentUser = AuthFactory.getUser();
//       resolve();
//     } else {
//       $window.location.href = '#/user';
//       // reject();
//     }
//   });
// });


// app.config(function($routeProvider,$httpProvider) {


//   $routeProvider
//   .when('/', {
//     templateUrl: 'partials/main.html',
//     controller: 'MainCtrl'
//   })
//   .when('/Tquestions', {
//     templateUrl: 'partials/Tquestions.html',
//     controller: 'TQCtrl',
//     resolve: {isAuth}

//   })
//   .when('/Jquestions', {
//     templateUrl: 'partials/Jquestions.html',
//     controller: 'JQCtrl'
//   })
//   .when('/gameOver', {
//     templateUrl: 'partials/gameOver.html',
//     controller: 'GOCtrl'
//   })
//   .when('/user', {
//     templateUrl: 'partials/user.html',
//     controller: 'UserCtrl'
//   })
//   .when('/TIL', {
//     templateUrl: 'partials/TIL.html',
//     controller: 'TILCtrl',
//     resolve: {isAuth}
//   })
//   .when('/memories', {
//     templateUrl: 'partials/memories.html',
//     controller: 'MemoryCtrl'
//   })
//   .otherwise('/user');
// });


// app.filter('unsafe', function($sce) {
//     return function(val) {
//         return $sce.trustAsHtml(val);
//     };
// });



// app.run(($location, UFBCreds) => {
//   let creds = UFBCreds;
//   let authConfig = {
//     apiKey: creds.apiKey,
//     authDomain: creds.authDomain
//   };

//   firebase.initializeApp(authConfig);
//   });


// app.directive('errSrc', function() {
//   return {
//     link: function(scope, element, attrs) {
//       element.bind('error', function() {
//         if (attrs.src != attrs.errSrc) {
//           attrs.$set('src', attrs.errSrc);
//         }
//       });
//     }
//   };
// });










