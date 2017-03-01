# Nugacity-Mobile_Trivia_App

Nugacity is a mobile all things trivia app. Users have three game mode options. Classic Trivia, Jeoparty Mode, or TIL.
Trivia mode provides users with random questions from a database of over 40,000. They are given 20 seconds to select the correct answer. If the user answers correctly, their score increases by the amount of time left in milliseconds muliplied by .01. They are given three "Noogs" per game and play until they are gone. Jeoparty mode provides users with random Jeopardy! questions from a database of nearly 300,000. There is no scoring logic as it is intended to be played with friends users can see the answer by pressing the answer button and play until their brains are full. TIL mode pulls random facts from the Reddit subreddit Today I Learned. Users can view as many as they'd like and save interesting facts to their "Nooguts" which they can view at any time.

## Installing

Clone this repo and install [Ionic](http://ionicframework.com/)

```
npm install -g cordova ionic
```

Install all dependencies

```
cd nugacity/www/lib

npm install

bower install
```

Download [Xcode](https://developer.apple.com/xcode/)
* Follow instructions to create developer account(should be free in versions 7+)

Contact [rtwhitfield84](https://github.com/rtwhitfield84) to gain access to API keys
* Create values directory and update with API keys

Build for IOS

```
ionic build ios
```
Open nugacity.xcodeproj in Xcode

```
cd nugacity/platforms/ios
```
Connect your mobile device and run build in Xcode

## Built With

* [Ionic](http://ionicframework.com/)
* [Angular](https://angularjs.org/) 
* [Firebase](https://firebase.google.com/) 


## Author

* **Richard Whitfield** - [rtwhitfield84](https://github.com/rtwhitfield84)


## Acknowledgments

* Trivia questions parsed from - [uberspot](https://github.com/uberspot/OpenTriviaQA)
* Jeopardy json questions from - [Reddit](https://www.reddit.com/r/datasets/comments/1uyd0t/200000_jeopardy_questions_in_a_json_file/)









