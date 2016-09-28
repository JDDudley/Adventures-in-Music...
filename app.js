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
            preview = `<a onclick="document.getElementById('audio-${i}').play()"><span class="glyphicon glyphicon-play play-icon"></span></a><a onclick="document.getElementById('audio-${i}').pause()"><span class="glyphicon glyphicon-pause play-icon"></span></a><br>
                                            <audio id="audio-${i}">
                                                <source src="${preview}">
                                            </audio>`
        }
//template for html to be written to list
        template += `<li class="list-group-item song-container">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-xs-9">
                                            <img src="${albumArt}" class="thumb">
                                            <h4 class="song-title">${title}</h4>
                                            <p class="artist-album"><span class="artist-name">${artist}</span><span class="album-name">${collection}</span></p>
                                        </div>
                                        <div class="col-xs-3 right-song-info">
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