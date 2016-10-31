function Controller() {
    this.drawSongs = function(songList){
        var template = "";
        curSongs = songList;
        for (var i = 0; i < songList.length; i++) {
        //show title
        $('#search-title').show();
        //grab information for each song
            var title = songList[i].title;
            var albumArt = songList[i].albumArt;
            var artist = songList[i].artist;
            var collection = songList[i].collection;
            var price = songList[i].price;
            var preview = songList[i].preview;
            var genre = songList[i].genre;
            var collectionURL = songList[i].collectionURL;
        //handle missing album name, add comma separator if present
            if (!collection) {
                collection = '';
            } else {
                collection = ', ' + collection;
            }
        //handle missing price, add dollar sign if present
            if (!price) {
                price = '';
            } else {
                if (!collectionURL) {
                    price = '$' + price;
                } else {
                    price = `<a href="${collectionURL}" target="_blank">$${price}</a>`
                }
            } 
        //handle missing music
        //generate html here as well to hide play/pause control if no tune
            if (!preview) {
                preview = '';
            } else {
                preview = `<a onclick="audioController(${i})"><span class="glyphicon glyphicon-play play-icon" id="play-${i}"></span></a><br>
                                                <audio id="audio-${i}">
                                                    <source src="${preview}">
                                                </audio>`
            }
        //add genre if we've got it, because why not?
            if (!genre) {
                genre = '';
            } else {
                genre = ' (' + genre + ')';
            }
        //template for html to be written to list
            template += `<li class="list-group-item song-container" id="${i}" draggable="true" ondragenter="dragEnter(event)" ondragstart="dragStart(event)">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-xs-9 col-sm-10">
                                            <span class="glyphicon glyphicon-play-circle img-icon" id="img-button-${i}" onclick="audioController(${i})"></span>
                                                <img src="${albumArt}" class="thumb">
                                                <h4 class="song-title">${title}</h4>
                                                <p class="artist-album"><span class="artist-name">${artist}</span><span class="album-name">${collection}</span><span class="genre">${genre}</span></p>
                                            </div>
                                            <div class="col-xs-3 col-sm-2 right-song-info">
                                                <span class="glyphicon glyphicon-star-empty fav-icon" id="fav-${i}" onclick="toggleFavorite(${i})"></span>
                                                ${preview}
                                                <p class="price">${price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>`
        }
        //write template variable to page
        document.getElementById('song-list').innerHTML = template;
    }
    this.drawMySongs = function(myTracks){
        var template = '';
        var j = 100;
        for (var i = 0; i < myTracks.length; i++) {
            mySong = myTracks[i];
            template += `<li class="list-group-item fav-container" id="${mySong.id}" draggable="true" ondragenter="dragEnter(event)" ondragstart="dragStart(event)">
                                    <div class="fav-song-controls">
                                        <span title="Promote Song" class="glyphicon glyphicon-thumbs-up fav-icons" id="up-fav-${i}" onclick="promoteSong(${i})"></span>
                                        <span title="Demote Song" class="glyphicon glyphicon-thumbs-down fav-icons" id="down-fav-${i}" onclick="demoteSong(${i})"></span>
                                        <span title="Remove Song" class="glyphicon glyphicon-trash fav-icons" id="trash-fav-${i}" onclick="deleteSong(${i})"></span>
                                        <span title="Play Song" class="glyphicon glyphicon-play fav-icons" id="play-${j}" onclick="audioController(${j})"></span><br>
                                        <audio id="audio-${j}">
                                            <source src="${mySong.preview}">
                                        </audio>
                                    </div>
                                    <span class="glyphicon glyphicon-play-circle img-icon" id="img-button-${j}" onclick="audioController(${j})"></span>
                                        <img src="${mySong.albumArt}" class="thumb">
                                        <h4 class="song-title">${mySong.title}</h4>
                                        <p class="artist-album"><span class="artist-name">${mySong.artist}</span>, <span class="album-name">${mySong.collection}</span></p>
                        </li>`
            j++;
        }
        //write template variable to page
        document.getElementById('my-playlist').innerHTML = template;
    }
    this.siftPlaylists = function(playlists) {
        var goodPlaylists = [];
        for (i = 0; i < playlists.length; i++) {
            var pl = playlists[i];
            var songs = {};
            var cnt = 0;
            if (Array.isArray(pl.songs)) { //if is array
                for (j = 0; j < pl.songs.length; j++) { //for each song
                    var song = pl.songs[j];
                    if (song.id && song.title && song.artist) { //looks valid
                        songs[song.id] = song; //save to object
                        cnt++; //increment counter
                    }
                }
            } else { //should be object
                for (key in pl.songs) { //for each song
                    var song = pl.songs[key];
                    if (song.id && song.title && song.artist) { //looks valid
                        songs[song.id] = song;
                        cnt++; //increment counter
                    }
                }
            }
            if (cnt) {
                pl.songs = songs;
                goodPlaylists.push(pl);
            }
        }
        return goodPlaylists;
    }
}