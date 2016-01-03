const h = require('virtual-dom/h')

function render (Todos, todo) {
  return h('li', {className: todo.done ? 'completed' : '', key: todo.id}, [
    h('div', {className: 'view'}, [
      h('form', {
        className: 'checkboxContainer',
        method: 'POST',
        action: '/mark?_method=PATCH',
        enctype: 'application/x-www-form-urlencoded'
      }, [
        h('input', {
          className: 'toggle',
          type: 'checkbox',
          checked: todo.done
        }),
        h('button', {
          className: 'checkboxSubmit',
          type: 'submit',
          name: 'done',
          value: !todo.done
        }),
        h('input', {
          type: 'hidden',
          name: 'id',
          value: todo.id
        })
      ]),
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
