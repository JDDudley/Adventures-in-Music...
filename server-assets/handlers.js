const whiteList = ['http://localhost:6988', 'http://jddudley.github.io/', 'http://jddudley.github.io/AdventuresInMusic', 'http://jddudley.github.io/AdventuresInMusic/public'];
const corsOptions = {
    origin: function(origin, callback) {
        var isWhiteListed = whiteList.indexOf(origin) !== -1;
        callback(null, isWhiteListed);
    }
};

function defaultErrorHandler(err, req, res, next) {
    let error;
    console.log('Error Caught:');
    console.log(err);
    if (res.headersSent) {
        return next(err);
    }
    let env = process.env.NODE_ENV;
    if (env !== 'production') {
        error = {
            ok: false,
            error: err.message,
            stack: err.stack
        }
    } else {
        error = {
            ok: false,
            err: err.message
        }
    }
    res.send(error);
}

module.exports = {
    corsOptions,
    defaultErrorHandler
}