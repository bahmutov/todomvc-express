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

  beforeEach(function () {
    cy.visit(baseUrl)
  })

  it.only('has the right title', function () {
    cy.title().should('contain', 'TodoMVC')
  })

  it('can load the app', function () {
    cy.get('h1').should('contain', 'todos')
  })

  it('can insert new todo', function () {
    cy.get('.new-todo')
      .type('new todo{enter}')
      .get('ul.todo-list')
        .find('li').should('not.be.empty')
  })

  it('can view active todos', function () {
    cy.get('.new-todo')
      .type('active todo{enter}')
      .get('ul.todo-list')
        .find('li').should('not.be.empty')
        .find('.toggle').check({force: true})
      .get('ul.filters').contains('Active').click()
      .hash().should('eq', '#/active')
  })

  it.skip('can clear all completed todos', function () {
    cy
      .get('ul.todo-list')
        .find('.toggle').check({force: true})
      .get('button.clear-completed').click()
      .get('ul.todo-list')
        .find('li').should('be.empty')
  })
})
