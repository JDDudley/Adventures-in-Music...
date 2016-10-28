function MyTunes() {
    var myTracks = loadTracks();
    var myPlaylists = {};
    this.getTracks = function(){
        return myTracks;
    }

    this.addTrack = function(thisSong){
        console.log('add ' + thisSong.title);
        myTracks.push(thisSong);
        saveTracks();
    }

    this.removeTrack = function(thisSong){
        console.log('remove ' + thisSong.title);
        for (i=0; i < myTracks.length; i++) {
            if (myTracks[i].title == thisSong.title && myTracks[i].artist == thisSong.artist) {
                myTracks.splice(i,1);
            }
        }
        // console.log(myTracks);
        saveTracks();
    }

    this.removeTrackById = function(i){
        myTracks.splice(i,1);
        saveTracks();
    }

//these functions work great but not compatible with drag and drop reordering

    function updateTracks() {
        var mySongList = document.getElementById('my-playlist');
        var items = mySongList.getElementsByTagName('li');
        console.log(items);
        var tempList = [];
        for (i=0; i < items.length; i++) {
            var id = items[i].id
            for (j = 0; j < myTracks.length; j++) {
                if (myTracks[j].id == id) {
                    tempList[i] = myTracks[j];
                }
            }
        }
        console.log(myTracks);
        console.log(tempList);
        myTracks = tempList;
    }

    this.promoteTrack = function(i) {
        updateTracks();
        if (i > 0) {
            myTracks.splice(i-1,0,myTracks.splice(i,1)[0]);
            saveTracks();
        }

    }
    this.demoteTrack = function(i){
        updateTracks();
        myTracks.splice(i+1,0,myTracks.splice(i,1)[0]);
        saveTracks();
    }
    // this.promoteTrack = function(i){
    //     if (i > 0) {
    //         myTracks.splice(i-1,0,myTracks.splice(i,1)[0]);
    //         saveTracks();
    //     }
    // }

    // this.demoteTrack = function(i){
    //     myTracks.splice(i+1,0,myTracks.splice(i,1)[0]);
    //     saveTracks();
    // }


    //localStorage

    function saveTracks(){
        localStorage.setItem('trackData', JSON.stringify(myTracks));
    }

    function loadTracks(){
        // check for localstorage of user data
        var localTracks = localStorage.getItem('trackData');
        if (localTracks) {
            console.log('Loading track data from localstorage...');
            // return JSON.parse(localTracks);
            return [];
        } else {
            return [];
        }
    }

    this.writePlaylist = function(playlistName) {
        myPlaylists[playlistName] = myTracks;
        console.log('writing playlist ' + playlistName + ' to localStorage...');
        console.log(myPlaylists);
        localStorage.setItem('myPlaylists', JSON.stringify(myPlaylists));
    }

    this.writeToServer = function(playlistName) {
        console.log('writing to server...');
        var thisPlaylist = {
            downvotes: 0,
            name: playlistName,
            songs: myTracks,
            upvotes: 1001
        }
        $.post('https://jddudley.github.io/music-api/playlists', thisPlaylist, function(playlist){
            return playlist;
        });
    }

    this.readPlaylist = function(playlistName) {
        console.log('loading playlists from localStorage...');
        myPlaylists = JSON.parse(localStorage.getItem('myPlaylists'));
        playlist = myPlaylists[playlistName];
        console.log(playlist);
        myTracks = playlist;
        return playlist;
    }
}