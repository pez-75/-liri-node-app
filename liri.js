var Twitter = require('twitter');
var fs = require('fs');
var request = require('request');
var keys = require('./keys.js');

var command = process.argv[2];
var input = process.argv[3];

switch (command) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThisSong(input);
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("Command not recognized!");
};

function myTweets() {
    var client = new twitter({
        consumer_key: keys.consumer_key,
        consumer_secret: keys.consumer_secret,
        access_token_key: keys.access_token_key,
        access_token_secret: keys.access_token_secret,
    });

    var params = { screen_name: 'Pez_75' };
    
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 1, i <= 20, i++)
            console.log(tweets);
        }
        else {
        	console.log(error);
        }
    });
}	    

function spotifyThisSong(input) {}
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: 'd76316f0fb7f4c36a4c0e32601a28c25',
        secret: '95895e2a5e0a4e9f8cd0c4bc387bb2a2'
    });

    if(!input) {
    	input = "The Sign"
    }

    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });

    //OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=b06a8d47

    function movieThis() {
        if (!input) {
            input = 'Mr. Nobody';
        }
        var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&apikey=b06a8d47";
        request(queryUrl, function(error, response, body) {

            if (!error && response.statusCode === 200) {

                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("RT Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);


            }
        });
    }