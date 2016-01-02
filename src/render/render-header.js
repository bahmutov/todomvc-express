const h = require('virtual-dom/h')

function render (Todos) {
  return h('header', {className: 'header'}, [
    h('h1', {}, 'todos'),
    h('form', {
      action: '/',
      method: 'post'
    }, [
      h('input', {
        className: 'new-todo',
        placeholder: 'What needs to be done?',
        autofocus: true,
        name: 'what'
      }, [])
    ])
  ])
}

module.exports = render
