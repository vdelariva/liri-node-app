# liri-node-app

## Description: ##

LIRI is a **L**anguage **I**nterpretation and **R**ecognition **I**nterface. Its a command line node app that takes in parameters and returns requested data.

## Implementation ##

Using node.js and various libraries, created a simple SIRI like program that will respond to a user's request. Using the terminal, the user enters a request to LIRI. The available commands are:
* **my-tweets:** Returns the last 20 tweets
* **spotify-this-song:** Returns the song name, artists, album, and preview song link
* **movie-this:** Returns the movie title, release year, ratings, country produced, language, actors, & a short plot description
* **do-what-it-says:** Reads file random.txt and executes the requested command

**Exceptions:**
* If no song title is specified, LIRI returns stats for the song "The Sign" by Ace of Base
* If no movie title is specified, LIRI returns status for the movie "Mr. Nobody"
* If no command is specified or "?" entered, LIRI lists the the help text with the available commands

## Tools ##

**Libraries**
* moment
* request
* twitter
* node-spotify-api
* fs
* dotenv

## Developer Notes ##

* **Bonus feature:** Added log file to keep track of LIRI commands
* If any of the API calls return an error, the error is written to the console
* The app will check if the movie is not found in OMDB and display an error to the console
* Not all movies have a Rotten Tomatoes rating, the app will check if there is more than one source for ratings, if there are more than one, then it will list all source ratings.
