const express = require('express')
const app = express()
const is = require('check-more-types')

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const aboutPage = [
  '<!DOCTYPE html>',
  '<html lang="en">',
  '<head>',
  '<meta charset="utf-8">',
  '</head>',
  '<body>',
  '<h1>About express-service</h1>',
  '</body>',
  '</html>'
].join('\n')

const renderIndexPage = require('./index-page')

function sendIndexPage (req, res) {
  res.send(renderIndexPage())
}

function sendAboutPage (req, res) {
  res.send(aboutPage)
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

app.get('/', sendIndexPage)
app.get('/app.css', sendAppCss)
app.get('/about', sendAboutPage)

app.post('/', addTodo, sendIndexPage)

module.exports = app
