/// <reference types="cypress" />

beforeEach(function () {
  const n = Cypress._.random(0, 5)
  cy.log(`will have ${n} todos`)
  cy.request('POST', '/reset', { n })
  cy.visit('/')
})

it('deletes all items', () => {})
