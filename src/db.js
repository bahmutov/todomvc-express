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

function addTodo (what) {
  const todos = loadTodos()
  la(is.array(todos), 'expected list of todos', todos)

  const newTodo = todoFactory(what)
  la(is.object(newTodo), 'could not create todo from', what, 'got', newTodo)
  todos.push(newTodo)

  fs.writeFileSync(todosPath, JSON.stringify(todos, null, 2), 'utf-8')
  console.log('added todo "%s" total %d', what, todos.length)
}

module.exports = {
  loadTodos: loadTodos,
  addTodo: addTodo
}
