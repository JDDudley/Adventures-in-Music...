//Do Not Modify the getMusic function
function getMusic(){
  var artist = document.getElementById('artist').value;
  itunes.getMusicByArtist(artist).then(controller.drawSongs);
}
//make new myTunes service
var myTunes = new MyTunes();
//get controller
var controller = new Controller();
//save loaded playlists here
var myPlaylists = [];
var curPlaylist;

//save songList in global variable for access
var curSongs = [];

//controller.drawSongs function runs automatically to draw results to screen

//loop through all audio and ensure nothing else is playing, if so pause
function pauseAudio() {
    //loop through other audio to make sure paused
    for (var j=0; j < curSongs.length; j++) {
        var audio = document.getElementById(`audio-${j}`);
        var button = document.getElementById(`play-${j}`);
        if (button.className == "glyphicon glyphicon-pause play-icon") {
            audio.pause();
            button.className = "glyphicon glyphicon-play play-icon";
            document.getElementById(`img-button-${j}`).className = "glyphicon glyphicon-play-circle img-icon";
        }
    }
    var myTunesLength = myTunes.getTracks().length;
    for (var i=100; i < myTunesLength; i++) {
        var audio = document.getElementById(`audio-${i}`);
        var button = document.getElementById(`play-${i}`);
        if (button.className = "glyphicon glyphicon-pause fav-icons") {
            audio.pause();
            button.className = "glyphicon glyphicon-play fav-icons";
            document.getElementById(`img-button-${i}`).className = "glyphicon glyphicon-play-circle img-icon";
        }
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
            //add listener for when song ends, play next
            audio.addEventListener('ended',function(){
                button.className = "glyphicon glyphicon-play play-icon";
                imgButton.className = "glyphicon glyphicon-play-circle img-icon";
                audioController(i + 1);
            });
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
            //add listener for when song ends, play next
            audio.addEventListener('ended',function(){
                button.className = "glyphicon glyphicon-play fav-icond";
                imgButton.className = "glyphicon glyphicon-play-circle img-icon";
                audioController(i + 1);
            });
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
    controller.drawMySongs(myTracks);
}

function promoteSong(i) {
    myTunes.promoteTrack(i);
    updateMySongs();
}

function demoteSong(i) {
    myTunes.demoteTrack(i);
    updateMySongs();
}

function upvotePlaylist() {
    myTunes.upvotePlaylist(curPlaylist);
}

function downvotePlaylist() {
    myTunes.downvotePlaylist(curPlaylist);
}

function deleteSong(i) {
    myTunes.removeTrackById(i);
    updateMySongs();
}

function loadPlaylists() {
    myTunes.getPlaylists(printPlaylists);
}

function loadThisPlaylist(id) {
    for (i = 0; i < myPlaylists.length; i++) {
        if (myPlaylists[i].id == id) {
            printThisPlaylist(myPlaylists[i]);
            curPlaylist = id;
        }
    }
}

function printThisPlaylist(data) {
    console.log('received data back...');
    $('.playlist-popup').slideUp();
    var playlistName = data.name;
    $('#playlist-title').text(playlistName);
    $('#my-tunes').slideDown();
    $('#up-icon').removeClass('inactive');
    $('#down-icon').removeClass('inactive');
    if (Array.isArray(data.songs)) {
        myTunes.postPlaylist(data.songs);
        controller.drawMySongs(data.songs);
    } else {
        var out = [];
        for (key in data.songs) {
            out.push(data.songs[key]);
        }
        controller.drawMySongs(out);
    }
}
function printPlaylists(playlists) {
    playlists = controller.siftPlaylists(playlists);
    playlists = sortPlaylists(playlists, 'upvotes');
    $('.playlist-popup').slideDown();
    var template = '';
    for (i = 0; i < playlists.length; i++) {
        template += `<tr onclick="loadThisPlaylist('${playlists[i].id}')">
                        <td>${playlists[i].name}</td>
                        <td>${playlists[i].upvotes}</td>
                        <td>${playlists[i].downvotes}</td>
                    </tr>`;
    }
    $('#playlist-list').html(template);
    myPlaylists = playlists;
}

function sortPlaylists(array, criteria) {
    if (criteria == 'upvotes') {
        console.log('sorting by upvotes...');
        array.sort(function(a,b) {
            if (a.upvotes < b.upvotes) {
                return 1;
            } else if (a.upvotes > b.upvotes) {
                return -1;
            } else {
                return 0;
            }
        })
    } else if (critieria == 'downvotes') {
        console.log('sorting by downvotes...');
        array.sort(function(a,b) {
            if (a.downvotes < b.downvotes) {
                return 1;
            } else if (a.downvotes > b.downvotes) {
                return -1;
            } else {
                return 0;
            }
        })
    }
    return array;
}

function closePopup() {
    $('.playlist-popup').slideUp();
    $('.save-popup').slideUp();
}

function savePlaylist() {
    $('.save-popup').slideDown();
    //need popup and logging of name, check if this is existing or new?
    // var playlistName = prompt('What\'s the playlist name?');
    // myTunes.writeToServer(playlistName);
}

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
    // $('#playlist-title').hide();
    // $('#search-title').hide();
    // $('#my-playlist').sortable();
    // $('#my-playlist').disableSelection();
    // $('#song-list').sortable();
    // $('#song-list').disableSelection();
    // $('#my-playlist').sortable();
    // $('#my-playlist').disableSelection();
    // $('#song-list').sortable();
    // $('#song-list').disableSelection();
    $('#my-tunes').hide();
    $('#search-title').hide();
    $('.playlist-popup').hide();
    $('.save-popup').hide();
});