/// <reference types="cypress" />

beforeEach(function () {
  const n = Cypress._.random(0, 5)
  cy.log(`will have ${n} todos`)
  cy.request('POST', '/reset', { n })
  cy.visit('/')
})

it('deletes all items', () => {
  cy.get('.todo-list li')
    // there might be no todos to delete
    // so disable the built-in existence assertion
    // inside the cy.get query command
    .should(Cypress._.noop)
    .its('length')
    .then((n) => {
      if (!n) {
        cy.log('No todos, nothing to delete')
      } else {
        // repeat deleting the first item N times
        // by going from the N to 0 out variable k
        // gives the current number of items in the list
        for (let k = n; k > 0; k -= 1) {
          cy.get('.todo-list li:first').find('.destroy').click({ force: true })
          // the page reloads, let's confirm we see k - 1 items
          cy.get('.todo-list li').should('have.length', k - 1)
        }
      }
    })
})
