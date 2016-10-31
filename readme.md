##Music Revisited!

Yep back to the sounding board and persistence is key

###The Setup

Your music app from the previous checkpoints is starting to look pretty good but you are missing a piece of functionality mainly playlists that can be shared amongst users. To pull this off you are going to need to ensure that each playlist has the following properites

<img src="https://bcw.blob.core.windows.net/public/img/music-revisited-data.jpg" width="800" />


```javascript
var playlist = {
  name: 'Jakes Awesome Playlist',
  upvotes: 100,
  downvotes: 0
  songs: {
    123: { //Dictionary to help prevent you from adding the same song Twice
      //Complete Song details here also include order
      title: 'Disco Inferno',
      order: 0
    }
  }
}
```

You are going to want to repurpose your service to talk to a node server which will then in turn utilize JS-Data to persist information into Firebase

Everyone will be using the following Firebase URL so you can see other people's playlists. 

```javascript
baseRef: 'https://my-musical-life.firebaseio.com/playlists'
```
***Do not delete other peoples playlists***
***Do not intentionally store bad data***

Your `package.json` file should look similar to this

```javascript
{
  "name": "music-is-fun",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js" 
  },
  "engines": {
    "node": "6.3.1",
    "npm": "3.9.0"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.15.2",
    "cors": "^2.7.1",
    "express": "^4.14.0",
    "firebase": "^2.4.2",
    "js-data": "^2.9.0",
    "js-data-firebase": "^2.1.1",
    "js-data-schema": "^1.2.5",
    "node-uuid": "^1.4.7"
  }
}
```



You are going to need to create a Playlist Model. Because of the way firebase works and due to a small security rule firebase will not let you persist a playlist without at least one song in the `songs` field.


> Since songs are already objects with id's to keep things simpler you can save the entire song on the playlist object itself. No need for  song-model.js on the server

```javascript
function savePlaylist(playlist, cb){
  //make sure your playlist has a name and songs property with at least 1 song stored by its id
  $.post(yourNodeURL, playlist, cb)
}
```
Building your API will likely be the trickest part of the assignment. **For now we are not going to worry about user authentication or the problems associated with only being able to edit your own playlists**

###Step 1 -  Node and JS-Data? `Total Points: 10`

It's important that you get the data right. On the node side of this application you are going to need the following files

√- index.js
√- package.json
√- data-adapter.js
√- playlist-model.js
√- playlist-routes.js

Your api should be robust enough to cover the necessary actions of. 

√- Create/POST: Playlists,
√- Read/GET: All Playlists vs Single Playlist ID
√ - PUT/EDIT: Add track to playlist songs

Requirements:
√- `2.5 points`: Ability to create/get playlists
√ - `5 points`: Entire song objects are passed to through the PUT along with a playlistId
√ - `2.5 points`: Data is persisted to firebase

###Step 2 - Sorting Tracks and Playlists `Total Points: 10`

You are going to keep all of the current features of your application. Things such as promoting and demoting tracks within playlits.  

Key features here will still include:
- `removeTrack`
- `promoteTrack`
- `demoteTrack`

You will also probably want the ability to upvote or downvote entire playlists of other peoples playlists so we can figure out who has the best taste in music. Your application will of course sort all playlists by their up and down votes. 

Requirements:
- `2.5 points`: Remove Track, Promote Track, Demote Track
√- `2.5 points`: Upvote/Downvote Playlists
- `2.5 points`: Sort playlists according to upvotes and downvotes
√- `2.5 points`: Persist your data with firebase


###BONUS - Some enhancing features `Total Points: 5`
Requirements: 
- Find a way to filter Playlists by their name
- Can you create your own list of top playlists?

###Finished?
When You are finished please slack the url for your github repo to me with in a DM. You are free to work on this however you like but ultimately it needs to be added to your github.