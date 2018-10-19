var dotEnv = require("dotenv").config();
var request = require('request');

var Spotify = require('node-spotify-api');

var keys = require("./keys.js"); 

var command = process.argv[2]; 


function concertThis(){
    require("dotenv").config();
    var moment = require('moment');
    moment().format();
    
    //Bandsintown API section
    var request = require("request");
    if (process.argv[2] = 'concert-this')
    {
      var artist = process.argv.slice(3).join('');
    
      var queryURL = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp';
      console.log(queryURL);
    
      request(queryURL, function (error, response, body) {
        if (error) {
          console.log(error);
          
        }
    
        var result = JSON.parse(body);
        
    
        for (k = 0; k < result.length; k++) {
        
          console.log('Venue name: ', result[k].venue.name);
          console.log('Venue city, state: ', result[k].venue.city, result[k].venue.region);
          console.log('Date of event', moment(result[k].datetime).format('MM / DD / YYYY'));
        }
      });
    }
 }

//Spotify API section
 function spotify(song){

    var Spotify = require('node-spotify-api');
 
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       var track = data.tracks.items[0];
       var artists = track.artists;
       artists.forEach(function(artist){
           console.log(artist.name) 
       })
       console.log(track.name);
       console.log(track.preview_url);
       console.log(track.album.name)
      });
};

function movieThis(){
    var request = require("request");

    var movieName = process.argv[3].toString();
    
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + process.env.MOVIE_ID;
    
    
    request(queryUrl, function(error, response, body) {
    
      if (!error && response.statusCode === 200) {
    
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomato Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Produced in: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Year);
        console.log("Actors: " + JSON.parse(body).Actors);
      }
    });
 }
//Push this section to the TXT file
 function doWhatItSays(){

var fs = require("fs");

fs.readFile("random.txt", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }

  
  var dataArr = data.split(",");

  if (data) {
    var Spotify = require('node-spotify-api');
 
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    
    var song = dataArr[1];
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            console.log("YOU HAVE A GOSH DARN ERROR YOU DOOFUS")
          return console.log('Error occurred: ' + err);
        }
       var track = data.tracks.items[0];
       var artists = track.artists;
       artists.forEach(function(artist){
           console.log(artist.name) 
       })
       console.log(track.name);
       console.log(track.preview_url);
       console.log(track.album.name)
      });
    
};

});
};
//Switches over a users command from the Node command line
switch(command){ 

  case "concert-this":
     concertThis()
  break;

  case "spotify-this-song":
     var song = process.argv[3];
     
     if(process.argv.length > 2){
         spotify(song)
     }
     else{
         spotify()
     }
      console.log("Spofity")
  break;

  case "movie-this":
     movieThis()
  break;

  case "do-what-it-says":
     doWhatItSays()
  break;
};
