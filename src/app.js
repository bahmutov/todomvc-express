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

app.get('/', sendIndexPage)
app.get('/app.css', sendAppCss)

// actions
app.post('/', addTodo, sendIndexPage)
app.delete('/', deleteTodo, sendIndexPage)
app.patch('/', markTodo, sendIndexPage)

module.exports = app
