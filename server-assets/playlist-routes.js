const router = require('express').Router();
const Playlist = require('./playlist-model');

module.exports.mountPath = '/playlists';
module.exports.router = router;

router.route('/:id?')
    .get(function(req,res,next) {
        if (req.params.id) {
            Playlist.getById(req.params.id, req.query.include, function(playlist) {
                if (playlist.stack) {
                    return next(playlist);
                }
                return res.send(playlist);
            })
        } else {
            Playlist.getAll(req.query.include, function(playlists) {
                if (playlists.stack) {
                    return next(playlists);
                }
                return res.send(playlists);
            })
        }
    })
    .post(function(req,res,next) {
        console.log('post received...');
        console.log(req.body);
        Playlist.create(req.body, function(playlist) {
            if (playlist.stack) {
                return next(playlist);
            }
            return res.send(playlist);
        })
    })