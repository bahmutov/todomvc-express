const render = require('virtual-todos')
const Todos = require('todomvc-model')
const toHTML = require('vdom-to-html')
const beautify = require('js-beautify').html

const header = [
  '<!DOCTYPE html>',
  '<html lang="en">',
  '<head>',
  '<meta charset="utf-8">',
  '<title>TodoMVC</title>',
  '<link rel="stylesheet" href="app.css">',
  '</style>',
  '</head>',
  '<body>'
].join('\n')

const footer = [
  '</body>',
  '</html>'
].join('\n')

function loadTodos () {
  const join = require('path').join
  const exists = require('fs').existsSync
  const todosPath = join(process.cwd(), 'todos.json')
  if (!exists(todosPath)) {
    return []
  }
  const text = require('fs').readFileSync(todosPath, 'utf-8')
  return JSON.parse(text)
}

function renderIndexPage () {
  Todos.items = loadTodos()
  const rendered = render(Todos)
  const todosMarkup = beautify(toHTML(rendered), { indent_size: 2 })
  return header + '\n' + todosMarkup + '\n' + footer
}

module.exports = renderIndexPage
