const express = require('express')
const app = express()

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

app.get('/', sendIndexPage)
app.get('/app.css', sendAppCss)
app.get('/about', sendAboutPage)

module.exports = app
