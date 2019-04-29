# Liri-Node-App

## Description
Users input a band, song, or movie name along with a command to get an output relevant to that information.

## Commands
Note: bands, songs, and movies will need to be in quotes
* node liri.js concert-this "band": Searches the Bandsintown API for the upcoming events. Shows the venue, the city/country,
and the date.
* node liri.js spotify-this-song "song": Searches the Spotify API for that song. Shows the artist, the song name, the link
to the Spotify page, and the name of the album.
* node liri.js movie-this "movie": Searches the OMDB API for information about the movie. Shows the title, year of release,
the IMDB rating, the Rotten Tomatoes rating, the country where it was made, languages spoken, the plot, and the actors.
* node liri.js do-what-it-says: Takes information from the 'random.txt' file and runs it.

## Demo

concert-this “Elton John”

![Image](/screenshots/1.png)


spotify-this-song “Boulevard of Broken Dreams”

![Image](/screenshots/2.png)


movie-this “Lord of the Rings”

![Image](/screenshots/3.png)


do-what-it-says

![Image](/screenshots/4.png)


The default without any commands after liri.js shows “Invalid”

![Image](/screenshots/5.png)