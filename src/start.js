var app = require('./app')
var http = require('http')

var server = http.createServer(app)
server.listen(process.env.PORT || 3000)

if (server.address()) {
  var host = server.address().address
  var port = server.address().port
  console.log('TodoMVC server listening at http://%s:%s', host, port)
} else {
  console.log('TodoMVC server has started')
}

app.on('todos', function (todos) {
  console.log('server has new %d todos', todos.length)
})
