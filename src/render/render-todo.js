const h = require('virtual-dom/h')

function render (Todos, todo) {
  return h('li', {className: todo.done ? 'completed' : '', key: todo.id}, [
    h('div', {className: 'view'}, [
      h('input', {
        className: 'toggle',
        type: 'checkbox',
        checked: todo.done,
        onchange: function (e) {
          Todos.mark(todo.id, e.target.checked)
        }
      }),
      h('label', todo.what),
      h('form', {
        method: 'POST',
        action: '/?_method=DELETE',
        enctype: 'application/x-www-form-urlencoded'
      }, [
        h('input', {
          type: 'hidden',
          name: 'id',
          value: todo.id
        }),
        h('button', {
          className: 'destroy',
          type: 'submit'
        })
      ])
    ])
  ])
}

module.exports = render
