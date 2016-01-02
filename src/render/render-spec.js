const la = require('lazy-ass')
const is = require('check-more-types')
/* global describe, it */
describe('render', () => {
  const render = require('./render')
  it('is a function', () => {
    la(is.fn(render))
  })

  const noop = () => {}

  it('renders zero todos', () => {
    const Todos = {
      items: [],
      add: noop,
      remove: noop,
      mark: noop,
      clearCompleted: noop
    }
    const tree = render(Todos)
    la(is.object(tree))
  })

  it('renders a couple todos', () => {
    const Todos = {
      items: [{
        what: 'foo'
      }, {
        what: 'bar'
      }],
      add: noop,
      remove: noop,
      mark: noop,
      clearCompleted: noop
    }
    const tree = render(Todos)
    la(is.object(tree))
  })
})
