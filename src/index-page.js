const render = require('./render/render')
const Todos = require('todomvc-model')
const toHTML = require('vdom-to-html')
const beautify = require('js-beautify').html

const header = [
  '<!DOCTYPE html>',
  '<html lang="en">',
  '<head>',
  '<meta charset="utf-8">',
  '<meta http-equiv="Content-Security-Policy" content="script-src \'none\';">',
  '<title>TodoMVC</title>',
  '<link rel="stylesheet" href="app.css">',
  '</style>',
  '</head>',
  '<body>',
  '<p>This is server-side rendering TodoMVC example.',
  'Only adding new todos (type and click Enter), removing and marking done',
  'are supported.</p>',
  '<p><strong>This page works perfectly with browser JavaScript disabled</strong></p>.'
].join('\n')

const footer = [
  '<p>Implemented by Gleb Bahmutov <a href="https://twitter.com/bahmutov">@bahmutov</a>',
  'source at <a href="https://github.com/bahmutov/todomvc-express">bahmutov/todomvc-express</a>.</p>',
  '</body>',
  '</html>'
].join('\n')

const db = require('./db')

function renderIndexPage () {
  Todos.items = db.loadTodos()
  const rendered = render(Todos)
  const todosMarkup = beautify(toHTML(rendered), { indent_size: 2 })
  return header + '\n' + todosMarkup + '\n' + footer
}

module.exports = renderIndexPage
