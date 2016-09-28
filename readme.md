##Welcome to the new and Improved Itunes!

Okay well maybe its not quite there yet, that's where you come in.

###The Setup

You will notice a file named `itunes-service.js` This file has been setup to get information from the itunes server and return a list of songs from whatever is typed into the input field. You can rest assured that this part of the application is fully functional. 

You are now being tasked with handling the data that comes back from the service after clicking the `Get Music` Button. 

The first thing to focus on will be adding the correct information to the screen. You will be doing this through the `drawSongs` function that has already been setup in app.js

> Notice that `drawSongs` is accepting an argument called `(songList)`

> The `songList` is an `array` of `objects` where each `object` is a song as illustrated below

```javascript
songList = [{
  title: 'string - song title',
  albumArt: 'string - url for song album cover art',
  artist: 'string - artistName',
  collection: 'string - album title',
  price: 'number - price of song',
  preview: 'string - url will play the song'
}]
```
When the user clicks the `Get Music Button` it runs a function in the `itunes-service.js` once that code is finished it will call the `drawSongs function` and pass in the list of songs requested. Thus you will not need to modify any of the code in the `itunes-service.js` or the `getMusic function` Also do not change the name of the `drawSongs function`.

###Step 1 -  Where is the output? `Total Points: 10`

It is your responsibility to update the `drawSongs function` so the user can actually see the data that is returned from the itunes service.

There are several ways to manipulate the DOM and add these elements. Primarily all of these songs will need to be added to the page I would recommend an easy to target container such as 

```html
<ul id="song-list">
  <!--SONGS ADDED DYNAMICALLY HERE-->
</ul>
```

Requirements:
- `5 points`: All songs are drawn to the page when the button is clicked - *(should be somewhere around 50 per search)*
- `2.5 points`: Each search will clear the previously loaded songs from the output
- `2.5 points`: Each property of the `song object` is rendered to the page 

###Step 2 - Prettify with Bootstrap `Total Points: 10`

Styling is a hard area to grade so at a bare minimum you will need to show your understanding of bootstrap classes. The following image is accomplished purely with built in bootstrap classes. Feel free to customize and go crazy with some awesome styles but make it look good and ensure that you are using the grid system so the results are responsive. Also be sure to use at least 2 bootstrap components

<div>
  <img class="img-responsive" src="https://bcw.blob.core.windows.net/public/img/mytunes.jpg" />
</div>

Requirements:
- `5 points`: Utilize bootstrap 12 column grid system
- `5 points`: Utilize at least 2 bootstrap components


###BONUS - Preview the Songs `Total Points: 5`
Requirements: 
- Clicking on the title should play the 30 second preview
- The preview must play without opening a new browser window
- Clicking play on a title while another song is already playing will stop the previous song and start the new one

###Finished?
When You are finished please slack the url for your github repo to me with in a DM. You are free to work on this however you like but ultimately it needs to be added to your github.
