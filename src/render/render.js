const h = require('virtual-dom/h')
const header = require('./render-header')
const renderTodos = require('./render-todos')
const footer = require('./render-footer')
const la = require('lazy-ass')
const is = require('check-more-types')

// const isTodos = is.schema({
//   items: is.array,
//   clearCompleted: is.fn,
//   add: is.fn,
//   mark: is.fn,
//   remove: is.fn
// })

function render (Todos, route) {
  la(is.object(Todos), 'expected todos object', Todos)
  // la(isTodos(Todos), 'Todos has incorrect interface', Todos)

  return h('section', {className: 'todoapp'}, [
    header(Todos),
    renderTodos(Todos),
    footer(Todos, route)
  ])
}

module.exports = render
