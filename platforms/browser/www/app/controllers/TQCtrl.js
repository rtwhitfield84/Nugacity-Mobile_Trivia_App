"use strict";

app.controller('TQCtrl', function($scope,$state,QStorage,AStorage,UserFactory,AuthFactory,$location,$window,$sce,$sanitize,$timeout,$cordovaToast){

//$scope variables

		$scope.randomize = [];
		$scope.scoreMultipler = null;
		$scope.strikes = AStorage.wrong;
    $scope.timerRunning = false;
    $scope.currentScore = 0;


		/***********************GET TQ'S*************************/

$scope.getFactoryTQ = () => {


	UserFactory.getFBUser(AuthFactory.getUser())
		.then((user) => {

			if (user[0].highScore !== "") {
			$scope.highScore = user[0].highScore;
			} else {
			$scope.highScore = 0;
			}

		QStorage.getTQuestions()
		.then((question) => {
      let correctAnswer = question.answer;
      console.log("correctAnswer", correctAnswer);
      $scope.correctAnswerId = correctAnswer;
      $scope.Tquestions = question.question;
      $scope.randomize = question.choices;
      $scope.randomize = $scope.shuffle($scope.randomize);
			$scope.resetTimer();
			$scope.startTimer();
			$scope.$apply();
		});
	});
};
$scope.getFactoryTQ();
		/***********************RANDOMIZE ANSWERS*************************/

$scope.shuffle = (answers) => {
	let currentIndex = answers.length, temporaryValue, randomIndex;

	// While there remain answers to shuffle...
		while (0 !== currentIndex) {

		// Pick a remaining answer...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current answer.
		temporaryValue = answers[currentIndex];
		answers[currentIndex] = answers[randomIndex];
		answers[randomIndex] = temporaryValue;
	}

	return answers;
};

/***********************TIMER/GAME LOGIC*************************/

$scope.$on('timer-tick', function (event, args) {
	$scope.scoreMultipler = args.millis;

	//time up game over logic
	if (args.millis === 0 && AStorage.wrong.length === 1) {
    $scope.$broadcast('timer-stop');
    $scope.timerRunning = false;
		$scope.gameOver();
	}

   if (args.millis === 0 && AStorage.wrong.length !== 0) {
		AStorage.wrong.splice(0,1);
		$scope.getFactoryTQ();
	}


	//timer methods

	$scope.startTimer = function (){
		$scope.$broadcast('timer-start');
		$scope.timerRunning = true;
	};

	$scope.stopTimer = (event,args) => {
		$scope.$broadcast('timer-stop');
		$scope.timerRunning = false;
	};
	$scope.resetTimer = () => {
		$scope.$broadcast('timer-reset');
		$scope.timerRunning = false;
	};

	/*********************ANSWER TEST***************************/


	$scope.findCorrect = ($event) => {

    $scope.$broadcast('timer-stop');
    $scope.timerRunning = false;


  if ($event.target.id === $event.target.innerText) {
    AStorage.score += 0.01 * $scope.scoreMultipler;
    $scope.currentScore = AStorage.score;

  } else {
    $scope.$broadcast('timer-stop');
    $scope.timerRunning = false;
    AStorage.wrong.splice(0,1);
    $cordovaToast
    .show('Incorrect! answer was ' + $scope.correctAnswerId + '.', 'short', 'bottom')
    .then(function(success) {
      $scope.getFactoryTQ();
    }, function (error) {
      // error
    });

    }
  if (AStorage.wrong.length === 0) {
    $scope.$broadcast('timer-stop');
    $scope.timerRunning = false;
    $scope.gameOver();
  }
  };

  /***********************GAME OVER LOGIC*************************/

});
    $scope.gameOver = () => {

    //get the current user
      UserFactory.getFBUser(AuthFactory.getUser())
      .then((user)=> {
         AStorage.currentUser = user[0].name;

    //if new score is greater than high score update user profile
        if (user[0].highScore < AStorage.score) {
          user[0].highScore = AStorage.score;
          $cordovaToast
          .show('New personal best!', 'long', 'top')
            .then(function(success) {
            // success
            }, function (error) {
            // error
            });
          }
      UserFactory.updateHighScore(user[0])
      .then((user)=> {
        UserFactory.getUsers()
        .then((users) => {
        let allUsers = [];
        let userCollection = users;

        Object.keys(userCollection).forEach((key) => {
          userCollection[key].id = key;
          allUsers.push(userCollection[key]);
        });
          UserFactory.users = allUsers;
          console.log("all", allUsers);
          $window.location.href = '#/gameOver';
          AStorage.wrong = ["img/light-bulb-icon.png","img/light-bulb-icon.png","img/light-bulb-icon.png"];
            AStorage.score = 0;
        });

      });
    });
  };

//ends timer/game logic


});





