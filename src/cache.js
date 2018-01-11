const cacheManager = require('cache-manager')
const memoryCache = cacheManager.caching({
  store: 'memory',
  max: 100,
  ttl: 60 /* seconds */
})

// "real" db
const db = require('./db')

// our cache resource is stored under key "todos"
// we can invalidate it using this function
const invalidateTodos = () => memoryCache.del('todos')

// wrap idempotent GET requests and ache them
// if cached resource is not found, provided callback function
// will return it
const loadTodos = () => memoryCache.wrap('todos', db.loadTodos)

// actions that invalidate the cached resource, additions, deletions, etc
const addTodo = what => invalidateTodos().then(() => db.addTodo(what))

const deleteTodo = id => invalidateTodos().then(() => db.deleteTodo(id))

const markTodo = (id, completed) =>
  invalidateTodos().then(() => db.markTodo(id, completed))

const clearCompleted = () => invalidateTodos().then(db.clearCompleted)

const reset = () => invalidateTodos().then(db.reset)

module.exports = {
  loadTodos,
  addTodo,
  deleteTodo,
  markTodo,
  clearCompleted,
  reset
}
