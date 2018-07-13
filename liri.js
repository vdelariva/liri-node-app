require("dotenv").config();

// Required NPM modules and files.
// 
//  npm install twitter
//  npm install request
//  npm install --save node-spotify-api
//  npm install dotenv
//  npm install fs
// ____________________________________________________________________________________

// NPM module used to access OMDB API.
var request = require("request");

// NPM module used to read the random.txt file.
var fs = require("fs");

// Used to access Twitter & Spotify keys in local file, keys.js.
var keysFile = require("./keys.js");

// NPM module used to access Twitter API.
var Twitter = require("twitter");

// NPM module used to access Spotify API.
var Spotify = require("node-spotify-api");

// NPM module for moment
var moment = require('moment');

// Output file for logs.
var filename = './log.txt';

//  Command requested
var command = process.argv[2];

// Optional additional parameters
var argument = getArgument();

processRequest(command,argument);

// ____________________________________________________________________________________

function getArgument() {
    const argIndex = 3;

    // Skip to command arguments and concatenate
    for (var i=0; i<argIndex; i++) {
        process.argv.shift();
    }

    return process.argv.join(" ")
}
// ____________________________________________________________________________________

function processRequest (command,argument){
    switch (command){
        case "my-tweets":
            getMyTweets();
        break;
        case "spotify-this-song":
            getSongInfo(argument);
        break;
        case "movie-this":
            getMovieInfo(argument);
        break;
        case "do-what-it-says":
            doWhatItSays();
        break;
        default:
            displayHelpText();
        break;
    }
}

// ____________________________________________________________________________________

function getMyTweets() {
    let client = new Twitter(keysFile.twitter);
    let params = {screen_name: 'vcdelariva', count: 20};
    // let logString = logDivider;

    client.get('statuses/user_timeline', params, (error, tweets, response) => {
    if (!error) {
        for (var i=0; i<tweets.length; i++){
            // logString += "My Tweets: "+tweets[i].text+"\n";
            console.log(`My Tweet:  ${tweets[i].text}  Created on: ${moment(tweets[i].created_at,"ddd MMM DD HH:mm:ss ZZ YYYY").format("LLL")}`);
        }
    }
    // console.log(logString);
    });
}

// ____________________________________________________________________________________

function getSongInfo(song){
    var spotify = new Spotify(keysFile.spotify);
    const defaultSong = "The Sign Ace of Base"
    var querySearch = song;

    if (song.length == 0) {
         querySearch = defaultSong;
    }
    spotify.search({ type: 'track', query: querySearch, limit: 1 }, (err, data) => {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // Log song information
        // console.log(JSON.stringify(data)); 
        console.log("Artists: "+data.tracks.items[0].album.artists[0].name);
        console.log("Song Name: "+data.tracks.items[0].name);
        console.log("Preview Link: "+data.tracks.items[0].preview_url);
        console.log("Album: "+data.tracks.items[0].album.name)
    });       
}

// ____________________________________________________________________________________

function getMovieInfo(movie){
    const defaultMovie = "Mr. Nobody";
    var movieName = movie;

    if (movieName.length == 0) {
        movieName = defaultMovie;
    };

    // Run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // Create a request to the queryUrl
    request(queryUrl, (error,response,data) => {

        // If the request is successful
        if (!error && response.statusCode === 200) {
            // Convert to JSON object
            var movie = JSON.parse(data);
            // Log the movie information
            console.log("Movie Title: "+movie.Title);
            console.log("Release Year: "+movie.Year);
            console.log("The IMDB movie rating is: "+movie.imdbRating);
            console.log(movie.Ratings[1].Source+" Rating: "+movie.Ratings[1].Value)
            console.log("Country Produced In: "+movie.Country);
            console.log("Language: "+movie.Language);
            console.log("Plot: "+movie.Plot);
            console.log("Actors: "+movie.Actors);
        }
    });
};

// ____________________________________________________________________________________

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", (error,data) => {
        if (error) {
            return console.log(error);
        }
        var whatToDoArray = data.split(",")
        console.log("What: "+whatToDoArray);

        command = whatToDoArray[0];
        argument = whatToDoArray[1];

        processRequest(command,argument);
    })
}

// ____________________________________________________________________________________

function displayHelpText() {
    console.log("LIRI - Language Interpretation and Recognition Interface")
    console.log("Commands:");
    console.log('liri my-tweets');
    console.log("liri spotify-this-song <song name>");
    console.log("liri movie-this <movie name>");
    console.log("liri do-what-it-says");
}

function logConsole(){
    // String to separate responses
const logDivider = "____________________________________________________________________________\n";


}

function logFile() {

}