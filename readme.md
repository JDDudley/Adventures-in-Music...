##Even more fun with Music!

Alright so it's checkpoint time again so `please dont stop the music...`

###The Setup

You should have from the previous checkpoint a fully functional app that searches the Itunes API for all of your favorite music. However the current state of your application is lacking a certian flare.

It's time to create a `my-tunes-service.js` and start encapsulating your data. Your end goal should be an app which allows you to create a list of your favorite songs that you can easily change the order and play at your discretion. Also be sure to keep track of the number of times you play a song.

The first thing to focus on will be adding a way for you to keep track of your favorite songs. You will be doing this in the `my-tunes-service.js`

> The my-tunes-service will likely be a constructor function with the following methods 

```javascript
function MyTunes(){
  var myTracks = loadTracks();
  
  this.getTracks = function(){...}
  this.addTrack = function(){...}
  this.removeTrack = function(){...}
  this.promoteTrack = function(){...}
  this.demoteTrack = function(){...}
  
  //Yep these guys deal with local storage
  function saveTracks(){...}
  function loadTracks(){...}
}
```
Managing your list of songs will likely be the trickest part of the assignment. 

###Step 1 -  Communicating with Services? `Total Points: 10`

You already have a controller that is responsible for drawing your `songList` to the page. The set up for the controller and most of your draw function will stay the same however you are going to need to add a button to each song as it is rendered to the page so you have the option of adding it to your tracks....

Start off by having your controller instantiate a `new MyTunes`. Focus on hooking up the add button to a function. Make sure you can get the button to pass you the information needed to `identify` the correct song.

Then make sure you take the `entire song object` and pass it to your `myTunes.addTrack` method

```javascript
  function saveTrack(){
    //....
      myTunes.addTrack(track) // <--- Make sure you have instantiated the MyTunesService
      return
    //....
  }
```

Requirements:
- `2.5 points`: All songs are drawn to the page with an extra button
- `5 points`: Entire song objects are passed to the myTunesService
- `2.5 points`: Once a song is sent to the `myTunes` it needs to be added to the `myTracks` array

###Step 2 - The MyTunes Component `Total Points: 10`

The Mytunes Component is the wow factor for your application. It is here where you can be creative in the way you want to manage your list. You will need to add a few more functions to your controller that will be tied to buttons for each of the songs in your list. 

Key features here will include:
- `removeTrack`
- `promoteTrack`
- `demoteTrack`

<div>
  <img src="https://bcw.blob.core.windows.net/public/img/mytunes2.jpg" />
</div>

Also don't forget it would be useless to keep around a list if you couldn't still play the songs.

Requirements:
- `2.5 points`: Remove Track
- `2.5 points`: Promote Track
- `2.5 points`: Demote Track
- `2.5 points`: Persist your data with local storage


###BONUS - Some enhancing features `Total Points: 5`
Requirements: 
- Have your myTunes List slide in and out when wanting to access it
- Implement dragging to reorder your songs
- Implement a drag to favorites


> Major Stretch Goal: Allow the user to create multiple playlists and manage the songs on each playlist 

###Finished?
When You are finished please slack the url for your github repo to me with in a DM. You are free to work on this however you like but ultimately it needs to be added to your github.