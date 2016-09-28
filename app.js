//Do Not Modify the getMusic function
function getMusic(){
  var artist = document.getElementById('artist').value;
  itunes.getMusicByArtist(artist).then(drawSongs);
}

//drawSongs function runs automatically to draw results to screen
function drawSongs(songList){
    var template = "";
    for (var i = 0; i < songList.length; i++) {
//grab information for each song
        var title = songList[i].title;
        var albumArt = songList[i].albumArt;
        var artist = songList[i].artist;
        var collection = songList[i].collection;
        var price = songList[i].price;
        var preview = songList[i].preview;
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
            price = '$' + price;
        }
//handle missing music
//generate html here as well to hide play/pause controls if no tune
        if (!preview) {
            preview = '';
        } else {
            preview = `<a onclick="audioController(${i})"><span class="glyphicon glyphicon-play play-icon" id="play-${i}"></span></a><br>
                                            <audio id="audio-${i}">
                                                <source src="${preview}">
                                            </audio>`
        }
//template for html to be written to list
        template += `<li class="list-group-item song-container">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-xs-9 col-sm-10">
                                            <img src="${albumArt}" class="thumb">
                                            <h4 class="song-title">${title}</h4>
                                            <p class="artist-album"><span class="artist-name">${artist}</span><span class="album-name">${collection}</span></p>
                                        </div>
                                        <div class="col-xs-3 col-sm-2 right-song-info">
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

//audio controller lets one button switch between play and pause control
//also loops through to ensure all other audio is paused before playing requested song
function audioController(i) {
//loop through other audio to make sure paused
/****
 * JAKE:
 * In this loop to check all existing audio elements on the page, I wasn't sure how to best get
 * the total number (songList.length at one point earlier in execution, but no longer available)
 * Set to 50 because I think that's the max printed but will this hit a shitload of errors
 * looping through a page where there are only, say, 10 results?
 */
    for (j=0; j < 50; j++) {
        var audio = document.getElementById(`audio-${j}`);
        var button = document.getElementById(`play-${j}`);
        if (button.className == "glyphicon glyphicon-pause play-icon") {
            audio.pause();
            button.className = "glyphicon glyphicon-play play-icon";
        }
    }
//now play or pause requested song
    audio = document.getElementById(`audio-${i}`);
    button = document.getElementById(`play-${i}`);
    var curClass = button.className;
    if (curClass == "glyphicon glyphicon-play play-icon") {
        audio.play();
        button.className = "glyphicon glyphicon-pause play-icon";
    } else {
        audio.pause();
        button.className = "glyphicon glyphicon-play play-icon";
    }
//this is supposedly 'proper code' to handle all cases but not currently working correctly
    // if (audio.paused && audio.currentTime > 0 && !audio.ended) {
    //     audio.play();
    //     button.className = "glyphicon glyphicon-pause play-icon";
    // } else {
    //     audio.pause();
    //     button.className = "glyphicon glyphicon-play play-icon";
    // }
}