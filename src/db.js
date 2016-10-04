const la = require('lazy-ass')
const is = require('check-more-types')

const join = require('path').join
const fs = require('fs')
const exists = fs.existsSync
const todosFolder = process.env.NOW ? '/tmp' : process.cwd()
const todosPath = join(todosFolder, 'todos.json')
const todoFactory = require('todomvc-model').utils.factory

la(is.fn(todoFactory), 'missing todo factory')

// returns a couple of fake todos to seed the list
function initialTodos () {
  const faker = require('fake-todos')
  return faker(2)
}

function loadTodos () {
  if (!exists(todosPath)) {
    console.log('Cannot find todos file, returning new list')
    return saveTodos(initialTodos())
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
  return items
}

function addTodo (what) {
  const todos = loadTodos()
  la(is.array(todos), 'expected list of todos', todos)

  const newTodo = todoFactory(what)
  la(is.object(newTodo), 'could not create todo from', what, 'got', newTodo)
  // I like putting new todo at the top of the list
  todos.unshift(newTodo)

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

function markTodo (id, done) {
  la(is.unemptyString(id), 'expected id', id)
  const todos = loadTodos()

  todos.forEach(function (todo) {
    if (todo.id === id) {
      todo.done = done
      console.log('Marked todo "%s" id %s as', todo.what, todo.id, done)
    }
  })

  saveTodos(todos)
}

function clearCompleted () {
  const todos = loadTodos()
  const remaining = todos.filter(todo => !todo.done)
  console.log('%d todos total, %d todos remaining',
    todos.length, remaining.length)
  saveTodos(remaining)
}

module.exports = {
  loadTodos,
  addTodo,
  deleteTodo,
  markTodo,
  clearCompleted
}
