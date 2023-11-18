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
    .then(($list) => {
      if (!$list.length) {
        cy.log('No todos, nothing to delete')
      } else {
        // click on each item's destroy button
        $list.each((k, $el) => {
          cy.wrap($el)
            .find('.destroy')
            // the element becomes visible only on hover
            // so have to force it to click without
            // checking visibility first
            .click({ force: true })
        })
      }
    })
})
