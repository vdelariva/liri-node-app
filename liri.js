require("dotenv").config();

// Required NPM modules and files.
// 
//  npm install twitter
//  npm install request
//  npm install --save node-spotify-api
// ____________________________________________________________________________________

// NPM module used to access Twitter API.
var twitter = require("twitter");

// Used to access Twitter & Spotify keys in local file, keys.js.
var keysFile = require("./keys.js");

// NPM module used to access Spotify API.
// var spotify = require("spotify");

// NPM module used to access OMDB API.
var request = require("request");

// NPM module used to read the random.txt file.
var fs = require("fs");

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);


//  Command requested
var command = process.argv[2];

// Optional additional parameters
var argument = "";

switch (command){
    case "my-tweets":
    // get tweets
    break;
    case "spotify-this-song":
    // spotify
    break;
    case "movie-this":
        getMovieInfo();
    break;
    case "do-what-it-says":
    // random
    break;
    default:
    // something
    break;
}


function getMovieInfo(){

    process.argv.shift()  // skip node.exe
    process.argv.shift()  // skip name of js file
    process.argv.shift()  // skip command

    var movieName = (process.argv.join(" "))

    console.log (movieName);

    // Run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

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