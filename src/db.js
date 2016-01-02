const la = require('lazy-ass')
const is = require('check-more-types')

const join = require('path').join
const fs = require('fs')
const exists = fs.existsSync
const todosPath = join(process.cwd(), 'todos.json')
const todoFactory = require('todomvc-model').utils.factory

la(is.fn(todoFactory), 'missing todo factory')

function loadTodos () {
  if (!exists(todosPath)) {
    console.log('Cannot find todos file, returning new list')
    return []
  }
  const text = fs.readFileSync(todosPath, 'utf-8')
  const items = JSON.parse(text)
  la(is.array(items), 'expected list of todos from file, read', text)
  return items
}

function saveTodos (items) {
  la(is.array(items), 'expected list of items, not', items)
  fs.writeFileSync(todosPath, JSON.stringify(items, null, 2), 'utf-8')
  console.log('saved list with %d item(s)', items.length)
}

function addTodo (what) {
  const todos = loadTodos()
  la(is.array(todos), 'expected list of todos', todos)

  const newTodo = todoFactory(what)
  la(is.object(newTodo), 'could not create todo from', what, 'got', newTodo)
  todos.push(newTodo)

  saveTodos(todos)
}

function deleteTodo (id) {
  la(is.unemptyString(id), 'expected id', id)
  const todos = loadTodos()
  la(is.array(todos), 'expected list of todos', todos)

  const filtered = todos.filter(function (todo) {
    return todo.id !== id
  })

  if (filtered.length === todos.length) {
    console.log('could not find todo with id', id)
    return
  }

  saveTodos(filtered)
}

module.exports = {
  loadTodos: loadTodos,
  addTodo: addTodo,
  deleteTodo: deleteTodo
}
