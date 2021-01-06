/// <reference types="cypress" />

describe('TodoMVC API', () => {
  beforeEach(() => {
    cy.request('POST', '/reset')
  })

  it('adds a todo', () => {
    cy.request('/todos').its('body').should('have.length', 0)
    cy.request('POST', '/', {
      what: 'new todo',
    })
    cy.request('/todos')
      .its('body')
      .should('have.length', 1)
      .its('0')
      .should('include', {
        what: 'new todo',
        done: false,
      })
      .and('have.property', 'id')
      // our uuid is lowercase
      .should(
        'match',
        /^[0-9a-f]{8}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{12}$/,
      )
  })
})
