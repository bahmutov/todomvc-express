'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
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
  '<link rel="stylesheet" href="/app.css">',
  '</style>',
  '</head>',
  '<body>',
  '<p>This is server-side rendering TodoMVC example.',
  'Only adding new todos (type and click Enter), removing and marking done',
  'are supported.</p>',
  '<p>custom todo protocol link <a href="todo2://active">active</a>, <a href="todo2://completed">completed</a></p>',
  '<p><strong>This page works perfectly with browser JavaScript disabled</strong></p>.'
].join('\n')

const footer = [
  '<p>Implemented by Gleb Bahmutov <a href="https://twitter.com/bahmutov">@bahmutov</a>',
  'source at <a href="https://github.com/bahmutov/todomvc-express">bahmutov/todomvc-express</a>.</p>',
  '</body>',
  '</html>'
].join('\n')

const db = require('./cache')
function T () {
  return true
}

// returns a promise resolved with HTML
function renderIndexPage (filter, route) {
  filter = filter || T
  return db.loadTodos().then(items => {
    Todos.items = items.filter(filter)
    const rendered = render(Todos, route)
    const todosMarkup = beautify(toHTML(rendered), { indent_size: 2 })
    return header + '\n' + todosMarkup + '\n' + footer
  })
}

function renderTodoPage (id) {
  la(is.unemptyString(id), 'missing todo id', id)
  const filter = todo => todo.id === id
  return renderIndexPage(filter)
}

module.exports = { renderIndexPage, renderTodoPage }
