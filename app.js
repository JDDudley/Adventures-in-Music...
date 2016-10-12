//Do Not Modify the getMusic function
function getMusic(){
  var artist = document.getElementById('artist').value;
  itunes.getMusicByArtist(artist).then(drawSongs);
}
//make new myTunes service
var myTunes = new MyTunes();

//save songList in global variable for access
var curSongs = [];

//drawSongs function runs automatically to draw results to screen
function drawSongs(songList){
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

//loop through all audio and ensure nothing else is playing, if so pause
function pauseAudio() {
    //loop through other audio to make sure paused
    for (j=0; j < curSongs.length; j++) {
        var audio = document.getElementById(`audio-${j}`);
        var button = document.getElementById(`play-${j}`);
        if (button.className == "glyphicon glyphicon-pause play-icon") {
            audio.pause();
            button.className = "glyphicon glyphicon-play play-icon";
            document.getElementById(`img-button-${j}`).className = "glyphicon glyphicon-play-circle img-icon";
        }
    }
    var myTunesLength = myTunes.getTracks().length;
    j = 100;
    for (i=0; i < myTunesLength; i++) {
        var audio = document.getElementById(`audio-${j}`);
        var button = document.getElementById(`play-${j}`);
        if (button.className = "glyphicon glyphicon-pause fav-icons") {
            audio.pause();
            button.className = "glyphicon glyphicon-play fav-icons";
            document.getElementById(`img-button-${j}`).className = "glyphicon glyphicon-play-circle img-icon";
        }
        j++;
    }
}
//audio controller lets one button switch between play and pause control
//also loops through to ensure all other audio is paused before playing requested song
function audioController(i) {
    //now play or pause requested song
    audio = document.getElementById(`audio-${i}`); //audio element for this song
    button = document.getElementById(`play-${i}`); //main play/pause control button on right
    imgButton = document.getElementById(`img-button-${i}`); //hidden play/pause button on thumbnail
    var curClass = button.className;
    if (i < 100) { //search result
        if (curClass == "glyphicon glyphicon-play play-icon") {
            pauseAudio();
            audio.play();
            button.className = "glyphicon glyphicon-pause play-icon";
            imgButton.className = "glyphicon glyphicon-pause img-icon"
        } else {
            audio.pause();
            button.className = "glyphicon glyphicon-play play-icon";
            imgButton.className = "glyphicon glyphicon-play-circle img-icon";
        }
    } else { //playlist song
        if (curClass == "glyphicon glyphicon-play fav-icons") {
            pauseAudio();
            audio.play();
            button.className = "glyphicon glyphicon-pause fav-icons";
            imgButton.className = "glyphicon glyphicon-pause img-icon"
        } else {
            audio.pause();
            button.className = "glyphicon glyphicon-play fav-icons";
            imgButton.className = "glyphicon glyphicon-play-circle img-icon";
        }
    }
}

//function toggles whether song drawn to screen is part of mytunes favorites
//default class for favorite button when empty:
//    glyphicon glyphicon-star-empty fav-icon
function toggleFavorite(i) {
    var favStar = document.getElementById('fav-' + i);
    if (favStar.className == 'glyphicon glyphicon-star-empty fav-icon') { //not favorite
        myTunes.addTrack(curSongs[i]);
        favStar.className = 'glyphicon glyphicon-star fav-icon';
    } else { //favorite already
        myTunes.removeTrack(curSongs[i]);
        favStar.className = 'glyphicon glyphicon-star-empty fav-icon';
    }
    updateMySongs();
}

function updateMySongs() {
    var myTracks = myTunes.getTracks();
    if (myTracks.length < 1) {
        $('#my-tunes').slideUp("slow",function() {
            //done
        });
    } else {
        $('#my-tunes').slideDown("slow",function() {
            //done
        });
    }
    drawMySongs(myTracks);
}
//drawMySongs outputs playlist to html
function drawMySongs(myTracks){
    var template = '';
    var j = 100;
    for (var i = 0; i < myTracks.length; i++) {
        mySong = myTracks[i];
    // template for html to be written to list
        // template += `<li class="list-group-item fav-container" draggable="true" ondragenter="dragEnter(event)" ondragstart="dragStart(event)">
        //                 <div class="container-fluid">
        //                     <div class="row">
        //                         <div class="col-xs-8 col-sm-9">
        //                         <span class="glyphicon glyphicon-play-circle img-icon" id="img-button-${j}" onclick="audioController(${j})"></span>
        //                             <img src="${mySong.albumArt}" class="thumb">
        //                             <h4 class="song-title">${mySong.title}</h4>
        //                             <p class="artist-album"><span class="artist-name">${mySong.artist}</span>, <span class="album-name">${mySong.collection}</span></p>
        //                         </div>
        //                         <div class="col-xs-4 col-sm-3 fav-song-controls">
        //                             <span title="Promote Song" class="glyphicon glyphicon-thumbs-up fav-icons" id="up-fav-${i}" onclick="promoteSong(${i})"></span>
        //                             <span title="Demote Song" class="glyphicon glyphicon-thumbs-down fav-icons" id="down-fav-${i}" onclick="demoteSong(${i})"></span>
        //                             <span title="Remove Song" class="glyphicon glyphicon-trash fav-icons" id="trash-fav-${i}" onclick="deleteSong(${i})"></span>
        //                             <span title="Play Song" class="glyphicon glyphicon-play fav-icons" id="play-${j}" onclick="audioController(${j})"></span><br>
        //                             <audio id="audio-${j}">
        //                                 <source src="${mySong.preview}">
        //                             </audio>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </li>`

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

function promoteSong(i) {
    myTunes.promoteTrack(i);
    updateMySongs();
}

function demoteSong(i) {
    myTunes.demoteTrack(i);
    updateMySongs();
}

function deleteSong(i) {
    myTunes.removeTrackById(i);
    updateMySongs();
}

function loadPlaylist() {
    var playlistName = prompt('What\'s the playlist name?');
    var playlist = myTunes.readPlaylist(playlistName);
    document.getElementById('playlist-title').innerHTML = playlistName;
    // $('#playlist-title').innerHTML = playlistName;
    updateMySongs();
}

function savePlaylist() {
    var playlistName = prompt('What\'s the playlist name?');
    myTunes.writePlaylist(playlistName);
    document.getElementById('playlist-title').innerHTML = playlistName;
    // $('#playlist-title').innerHTML = playlistName;
}

//if local playlist, draw immediately
updateMySongs();

// var dragSrcEl = null;
// function handleDragStart(e) {
//   this.style.opacity = '0.5';  // this / e.target is the source node.
//   dragSrcEl = this;
//   e.dataTransfer.effectAllowed = 'move';
//   e.dataTransfer.setData('text/html', this.innerHTML);
// }

// function handleDragEnd(e) {
//     this.style.opacity = '1';
// }

// function handleDrop(e) {
//   // this / e.target is current target element.
//   if (e.stopPropagation) {
//     e.stopPropagation(); // stops the browser from redirecting.
//   }
//   if (dragSrcEl != this) {
//       dragSrcEl.innerHTML = this.innerHTML;
//       this.innerHTML = e.dataTransfer.getData('text/html');
//   }
//   // See the section on the DataTransfer object.
//   return false;
// }

// var lis = document.querySelectorAll('#my-playlist li');
// [].forEach.call(lis, function(li) {
//   li.addEventListener('dragstart', handleDragStart, false);
//   li.addEventListener('dragend', handleDragEnd, false);
//   li.addEventListener('drop',handleDrop, false);
// });

    var source;

    function isbefore(a, b) {
        if (a.parentNode == b.parentNode) {
        for (var cur = a; cur; cur = cur.previousSibling) {
            if (cur === b) { 
            return true;
            }
        }
        }
        return false;
    } 

    function dragEnter(e) {
        if (e.target.parentNode.className == 'list-group play-list') { //if target correct
            if (source.className == 'list-group-item song-container') { //add to playlist
                toggleFavorite(source.id);
            } else {
                if (isbefore(source, e.target)) {
                    e.target.parentNode.insertBefore(source, e.target);
                }
                else {
                    e.target.parentNode.insertBefore(source, e.target.nextSibling);
                }
            }
        }
    }

    function dragStart(e) {
        source = e.target;
        e.dataTransfer.effectAllowed = 'move';
    }



$(document).ready(function() {
    // $('#my-playlist').sortable();
    // $('#my-playlist').disableSelection();
    // $('#song-list').sortable();
    // $('#song-list').disableSelection();
    $('#search-title').hide();
});