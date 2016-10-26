const express = require('express')
const app = express()
const morgan = require('morgan')
const is = require('check-more-types')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

function hasMethodField (req) {
  return is.object(req.body) &&
    is.unemptyString(req.body._method)
}

function grabMethodFromBody (req, res) {
  if (hasMethodField(req)) {
    const method = req.body._method
    delete req.body._method
    return method
  }
}

app.use(methodOverride(grabMethodFromBody))

const renderIndexPage = require('./index-page')

function sendIndexPage (req, res) {
  res.send(renderIndexPage())
}

function activeTodosPage (req, res) {
  const filter = (todo) => !todo.done
  res.send(renderIndexPage(filter, req.url))
}

function completedTodosPage (req, res) {
  const filter = (todo) => todo.done
  res.send(renderIndexPage(filter, req.url))
}

function toIndex (req, res) {
  res.redirect('/')
}

function broadcast (req, res, next) {
  const db = require('./db')
  const todos = db.loadTodos()
  console.log('emitting %d todos', todos.length)
  app.emit('todos', todos)
  next()
}

function sendAppCss (req, res) {
  const cssPath = require('path').join(__dirname, 'app.css')
  const css = require('fs').readFileSync(cssPath, 'utf-8')
  res.set('Content-Type', 'text/css; charset=UTF-8')
  res.send(css)
}

function addTodo (req, res, next) {
  console.log('adding new todo')
  console.log('post params', req.body)

  // sync for now
  if (is.unemptyString(req.body.what)) {
    const db = require('./db')
    db.addTodo(req.body.what)
  }
  next()
}

function deleteTodo (req, res, next) {
  console.log('deleting todo', req.body.id)

  // sync for now
  if (is.unemptyString(req.body.id)) {
    const db = require('./db')
    db.deleteTodo(req.body.id)
  }
  next()
}

function markTodo (req, res, next) {
  console.log('marking todo', req.body.id, 'as done?', req.body.done)

  // sync for now
  if (is.unemptyString(req.body.id)) {
    const db = require('./db')
    db.markTodo(req.body.id, req.body.done === 'true')
  }

  next()
}

function clearCompleted (req, res, next) {
  console.log('clearing completed todos')
  const db = require('./db')
  db.clearCompleted()
  next()
}

app.get('/', broadcast, sendIndexPage)
app.get('/app.css', sendAppCss)
app.get('/active', activeTodosPage)
app.get('/completed', completedTodosPage)

// actions
app.post('/', addTodo, broadcast, toIndex)
app.delete('/', deleteTodo, broadcast, toIndex)
app.patch('/', markTodo, broadcast, toIndex)
app.post('/clear-completed', clearCompleted, broadcast, toIndex)

module.exports = app
