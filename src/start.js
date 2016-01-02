var app = require('./app')
var http = require('http')

var server = http.createServer(app)
server.listen(3000)

var host = server.address().address
var port = server.address().port
console.log('TodoMVC server listening at http://%s:%s', host, port)
