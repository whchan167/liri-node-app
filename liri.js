//create a variable input for arguments and store the users' request in these variables
var input = process.argv[2];
var input2 = process.argv[3];

// build a twitter function to pull latest 20 tweets
function twitter(){
  //link the keys.js file and store it in variable
  var keys = require('./keys.js');

  //link to the twitter server account
  var Twitter = require('twitter');

  //connect the twitter account by using authentication key
  var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
  });
  
  //client request the updated tweets and get response from twitter
  client.get('statuses/user_timeline', {count: 20}, function(error, tweets, response) {

    if (error) {
      
      //log the error
      console.log("An error has occured: " + error);
    
    } else {
        console.log("Below are my tweets!" + "\n")
        
        //loop through all tweets limited to 20 only
        for (var i = 0; i < tweets.length; i++) {

          //Using console.log(JSON.stringify(tweets)) to change JSON to string;
          //log all tweets with the date and text
          console.log("Date: " + tweets[i].created_at);
          console.log("Tweet #" + i + ": " + tweets[i].text + "\n");
        }
      }
    });
  }

//create a function for spotify-this-song and retrieve the information 
function spotify(song) {

//this song is a default if user did not request the song
song = "The Sign by Ace of Base"
if (input2 ==""){
  input2 = song;
}

//send request to spotify queryURL
var spotify = require ('spotify');

//run the request to spotify with specific song the user entered
spotify.search({ type: 'track', query: song }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

    //loop through all the data requested
    for (var i=0; i<11; i++) {

    //using console.log(JSON.stringify(data)) to change JSON to string
    //log all necessary information of the song user requested
    console.log("----------------------------------------------------------------");
    console.log("Artist: " + data.tracks.items[i].artists[0].name);
    console.log("Song Name: " + data.tracks.items[i].name);
    console.log("Spotify Link: " + data.tracks.items[i].external_urls.spotify);
    console.log("Album Name: " + data.tracks.items[i].album.name);
    console.log("----------------------------------------------------------------");
    };
  });
};

//create a function for movie search and retrieve the information
function movie(movieName) {

//if user leaves the movie title blank, it automatically defaults to "Mr. Nobody"
movieName = "Mr. Nobody";
if (input2 == "") {
    movieName = input2;
}

//store the request of OMDB in variable
var request = require("request");

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=true";

// Then create a request to the queryUrl and run a request to the OMDB API with the movie specified
request(queryUrl, function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // a varible for Parse the body of the site 
    var movieinfo = JSON.parse(body);
   
    //log all necessary information in command line per user request
    console.log("----------------------------------------------------------------");
    console.log("Title of the movie: " + movieinfo.Title);
    console.log("Year of the movie: " + movieinfo.Year);
    console.log("IMDB Rating of the movie: " + movieinfo.imdbRating);
    console.log("Country where the movie was produced: " + movieinfo.Country);
    console.log("Language of the movie: " + movieinfo.Language);
    console.log("Plot of the movie: " + movieinfo.Plot);
    console.log("Actors in the movie: " + movieinfo.Actors);
    console.log("Rotten Tomatoes Rating: " + movieinfo.tomatoUserRating);
    console.log("Rotten Tomatoes URL: " + movieinfo.tomatoURL);
    console.log("----------------------------------------------------------------");
    }
  });
}

// Takes the text inside of random.txt and uses it to call the first command with the second part as it's parameter
function dowhatitsays() {
  // fs is an NPM package for reading and writing files
  var fs = require("fs");

  //read from the file of random.txt
  fs.readFile("random.txt", "utf8", function(error, data) {

        //store the text data in the variable array and split each data with comma
        var textData = data.trim().split(',');

        //two data found in random.txt and store them in each argument variable
        input = textData[0];
        input2 = textData[1];
        
        //grab the random.txt data and run the program in liri.js with the data
        switch(input) {
          case 'my-tweets':
            twitter();
            break;
          case 'spotify-this-song':
            spotify(input2);
            break;
          case 'movie-this':
            movie(input2);
            break;
        }
  });
}

switch (input) {
  case 'my-tweets':
  twitter();
  break;
  case 'spotify-this-song':
  spotify(input2);
  break;
  case 'movie-this':
  movie(input2);
  break;
  case 'do-what-it-says':
  dowhatitsays()
  break;
}