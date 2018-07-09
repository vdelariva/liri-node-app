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

//  Command requested
var command = process.argv[2];

// Optional additional parameters
var argument = getArgument();

processRequest(command,argument);

// ____________________________________________________________________________________

function getArgument() {
    process.argv.shift()  // skip node.exe
    process.argv.shift()  // skip name of js file
    process.argv.shift()  // skip command

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
        // something
        break;
    }
}

// ____________________________________________________________________________________

function getMyTweets() {
    var client = new Twitter(keysFile.twitter);
    var params = {screen_name: 'vcdelariva', count: 20};

    client.get('statuses/user_timeline', params, (error, tweets, response) => {
    if (!error) {
        console.log(tweets.length);
        for (var i=0; i<tweets.length; i++){
            console.log("My Tweets: "+tweets[i].text)
        }
    }
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