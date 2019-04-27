require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var request = require('request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var parameter = process.argv[3];

//COMMANDS: concert-this, spotify-this-song, movie-this, do-what-it-says
function switchCase() {

  switch (command) {

    case 'concert-this':
    bandsInTown(parameter);                   
    break;                          

    case 'spotify-this-song':
    spotifySong(parameter);
    break;

    case 'movie-this':
    omdbInfo(parameter);
    break;

    case 'do-what-it-says':
    getRandom();
    break;

    default:                            
    console.log("Invalid");
    break;

  }
};

// concert-this
function bandsInTown(parameter){

	if ('concert-this') {
		var artist="";
		for (var i = 3; i < process.argv.length; i++) {
			artist+=process.argv[i];
		}
		console.log(artist);
	} else {
		artist = parameter;
	}

	var queryUrl = "https://rest.bandsintown.com/artists/"+ artist +"/events?app_id=codingbootcamp";

	request(queryUrl, function(error, response, body) {

		var JS = JSON.parse(body);
		
    for (i = 0; i < JS.length; i++) {
      var dateTime = JS[i].datetime;
      var month = dateTime.substring(5,7);
      var year = dateTime.substring(0,4);
      var day = dateTime.substring(8,10);
      var dateForm = month + "/" + day + "/" + year
  
      console.log("\n---------------------------------------------------\n");
      console.log("Name: " + JS[i].venue.name);
      console.log("City: " + JS[i].venue.city);
      console.log("Country: " + JS[i].venue.country);
      console.log("Date: " + dateForm);
      console.log("\n---------------------------------------------------\n");
    }
  
	});
}

// spotify-this-song
function spotifySong(parameter) {

  var searchTrack;
  if (parameter === undefined) {
    searchTrack = "Kiss From A Rose";
  } else {
    searchTrack = parameter;
  }

  spotify.search({
    type: 'track',
    query: searchTrack
  }, function(error, data) {

    if (error) {
      throw error
    } else {
      console.log("\n---------------------------------------------------\n");
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song: " + data.tracks.items[0].name);
      console.log("Preview: " + data.tracks.items[3].preview_url);
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("\n---------------------------------------------------\n");
    }
  
  });
};

// movie-this
function omdbInfo(parameter) {

	var findMovie;
	
  if (parameter === undefined) {
    findMovie = "Star Wars";
  } else {
    findMovie = parameter;
  };

  var queryUrl = "http://www.omdbapi.com/?t=" + findMovie + "&y=&plot=short&apikey=trilogy";
  
  request(queryUrl, function(error, response, body) {
		
		var bodyOf = JSON.parse(body);
    
    console.log("\n---------------------------------------------------\n");
    console.log("Title: " + bodyOf.Title);
    console.log("Release Year: " + bodyOf.Year);
		console.log("IMDB Rating: " + bodyOf.imdbRating);
		console.log("Rotten Tomatoes Rating: " + bodyOf.Ratings[1].Value); 
    console.log("Country: " + bodyOf.Country);
    console.log("Language: " + bodyOf.Language);
    console.log("Plot: " + bodyOf.Plot);
    console.log("Actors: " + bodyOf.Actors);
    console.log("\n---------------------------------------------------\n");
    
  });
};

// do-what-it-says
function getRandom() {

	fs.readFile('random.txt', "utf8", function(error, data){

    if (error) {
      throw(error);
    }
  
    var dataArr = data.split(",");
    
    if (dataArr[0] === "spotify-this-song") {
      var songcheck = dataArr[1].trim().slice(1, -1);
      spotifySong(songcheck);
    } 
   
  });
};

switchCase();