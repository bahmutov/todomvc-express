const la = require('lazy-ass')
const is = require('check-more-types')
const pMinDelay = require('p-min-delay')

const join = require('path').join
const fs = require('fs-extra')
const todosFolder = process.env.NOW ? '/tmp' : process.cwd()
const todosPath = join(todosFolder, 'todos.json')
const todoFactory = require('todomvc-model').utils.factory

la(is.fn(todoFactory), 'missing todo factory')

// returns a couple of fake todos to seed the list
function initialTodos () {
  const faker = require('fake-todos')
  return faker(20)
}

function reset () {
  console.log('resetting todos')
  return saveTodos([])
}

const loadTodos = () => {
  console.log('db: loading todos')
  return fs.pathExists(todosPath).then(found => {
    if (!found) {
      console.log('Cannot find todos file, returning new list')
      return saveTodos(initialTodos())
    }
    return pMinDelay(fs.readJson(todosPath), 1000)
  })
}

function saveTodos (items) {
  la(is.array(items), 'expected list of items, not', items)
  console.log('db: saved %d todo(s)', items.length)
  return fs.writeJson(todosPath, items, {spaces: 2})
}

function addTodo (what) {
  return loadTodos().then(todos => {
    la(is.array(todos), 'expected list of todos', todos)
    console.log('adding todo to %d existing', todos.length)

    const newTodo = todoFactory(what)
    la(is.object(newTodo), 'could not create todo from', what, 'got', newTodo)
    // I like putting new todo at the top of the list
    todos.unshift(newTodo)

    console.log(newTodo)
    return saveTodos(todos)
  })
}

function deleteTodo (id) {
  la(is.unemptyString(id), 'expected id', id)
  return loadTodos().then(todos => {
    la(is.array(todos), 'expected list of todos', todos)

    const filtered = todos.filter(function (todo) {
      return todo.id !== id
    })

    if (filtered.length === todos.length) {
      console.log('could not find todo with id', id)
      return
    }

    return saveTodos(filtered)
  })
}

function markTodo (id, done) {
  la(is.unemptyString(id), 'expected id', id)
  return loadTodos().then(todos => {
    todos.forEach(function (todo) {
      if (todo.id === id) {
        todo.done = done
        console.log('Marked todo "%s" id %s as', todo.what, todo.id, done)
      }
    })

    return saveTodos(todos)
  })
}

function clearCompleted () {
  return loadTodos().then(todos => {
    const remaining = todos.filter(todo => !todo.done)
    console.log(
      '%d todos total, %d todos remaining',
      todos.length,
      remaining.length
    )
    return saveTodos(remaining)
  })
}

module.exports = {
  loadTodos,
  addTodo,
  deleteTodo,
  markTodo,
  clearCompleted,
  reset
}
