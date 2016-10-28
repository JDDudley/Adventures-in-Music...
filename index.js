let express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    handlers = require('./server-assets/handlers'),
    routes = require('./server-assets/playlist-routes'),
    server = express(),
    port = process.env.PORT || 6988,
    http = require('http').Server(server);

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true}))

server.use('/', express.static(`${__dirname}/public`))
server.use('/api', cors(handlers.corsOptions), routes.router)

server.listen(port, function() {
    console.log('Server running on port ' + port)
})