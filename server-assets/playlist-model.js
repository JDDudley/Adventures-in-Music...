let dataAdapter = require('./data-adapter'),
    uuid = dataAdapter.uuid,
    ds = dataAdapter.ds,
    formatQuery = dataAdapter.formatQuery;

let Playlist = ds.defineResource({
    name: 'playlists',
    endpoint: 'playlists',
    filepath: __dirname + '/playlists.db'
})

function create(playlist, cb) {
    if (!playlist) {
        return cb({error: 'Missing playlist.'});
    }
    console.log(playlist);
    // Playlist.create(playlist).then(cb).catch(cb);
};

function getAll(query, cb) {
    Playlist.findAll({}).then(cb).catch(cb);
};

function getById(id, query, cb) {
    Playlist.find(id, formatQuery(query)).then(cb).catch(cb);
};

module.exports = {
    create,
    getAll,
    getById
}