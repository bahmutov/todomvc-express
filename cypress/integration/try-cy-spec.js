'use strict'

/* eslint-env mocha */
/* global cy, Cypress, expect */

const random = () => Math.random().toString(16).substr(2)

describe('TodoMVC', function () {
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
    cy
      .get('.new-todo')
      .type(`${label}{enter}`)
      .get('ul.todo-list')
      .find('li')
      .should('not.be.empty')
  }

  beforeEach(function () {
    cy.request('POST', `${baseUrl}/reset`)
    cy.visit(baseUrl)
  })

  it.only('can request data', () => {
    addTodo()
    addTodo()
    addTodo()
    const url = `${baseUrl}/todos`
    cy.request(url).its('body').should('have.length', 3)
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
    cy.get('footer').contains('All').should('have.class', 'selected')

    cy
      .get('.new-todo')
      .type('active todo{enter}')
      .get('ul.todo-list')
      .find('li')
      .should('not.be.empty')
      .find('.toggle')
      .check({ force: true })
      .get('ul.filters')
      .contains('Active')
      .click()
      .url()
      .should('contain', '/active')

    cy.get('footer').contains('Active').should('have.class', 'selected')
  })

  it('can clear all completed todos', function () {
    const id = random()
    const label = `an example ${id}`
    addTodo(label)
    cy.get('ul.todo-list').contains('li', label).find('.checkboxSubmit').click()

    cy.get('button.clear-completed').click()

    cy.get('ul.todo-list').contains('li', label).should('not.exist')
  })

  it('can show individual TODO item', function () {
    const id = random()
    const label = `one todo ${id}`
    addTodo(label)
    cy.get('ul.todo-list').contains('li', label).should('be.visible').click()
    cy.url().should('contain', `/todo/`)
    cy.get('ul.todo-list li').should('have.length', 1)
  })
})
