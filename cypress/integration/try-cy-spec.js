'use strict'

// using function declaration instead of arrow functions
// so Safari browser understands

describe('a cy unit test', function () {
  it('is ok', function () {
    expect(true).to.be.true
  })

  it('understands arrow functions', function () {
    expect(false).to.be.false
  })
})

describe('todomvc app', function () {
  const baseUrl = Cypress.env('HOST') || 'http://localhost:3000'

  function addTodo (label = 'new todo') {
    cy.get('.new-todo')
      .type(`${label}{enter}`)
      .get('ul.todo-list')
        .find('li').should('not.be.empty')
  }

  beforeEach(function () {
    cy.visit(baseUrl)
  })

  it('has the right title', function () {
    cy.title().should('contain', 'TodoMVC')
  })

  it('can load the app', function () {
    cy.get('h1').should('contain', 'todos')
  })

  it('can insert new todo', function () {
    addTodo()
  })

  it('can reload the page after adding new todo', () => {
    addTodo()
    cy.reload()
  })

  it('can view active todos', function () {
    cy.get('footer')
      .contains('All')
      .should('have.class', 'selected')

    cy.get('.new-todo')
      .type('active todo{enter}')
      .get('ul.todo-list')
        .find('li').should('not.be.empty')
        .find('.toggle').check({force: true})
      .get('ul.filters').contains('Active').click()
      .url().should('contain', '/active')

    cy.get('footer')
      .contains('Active')
      .should('have.class', 'selected')
  })

  it('can clear all completed todos', function () {
    const random = Math.random().toString(16).substr(2)
    const label = `an example ${random}`
    addTodo(label)
    cy
      .get('ul.todo-list')
      .contains('li', label)
      .find('.checkboxSubmit').click()

    cy
      .get('button.clear-completed').click()

    cy
      .get('ul.todo-list')
      .contains('li', label)
      .should('not.exist')
  })
})
