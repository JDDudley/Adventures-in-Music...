let uuid = require('node-uuid'),
    firebase = require('firebase'),
    jsData = require('js-data'),
    fbAdapter = require('js-data-firebase'),
    ds = new jsData.DS(),
    adapter = new fbAdapter({basePath: 'https://my-musical-life.firebaseio.com/playlists'});

function formatQuery(query) {
    query = query || '';
    return {
        with: query.split(',').join(' ').split(' ')
    };
};

ds.registerAdapter('firebase',adapter, { default: true});

module.exports = {
    ds,
    uuid,
    formatQuery
};