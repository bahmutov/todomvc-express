/// <reference types="cypress" />

beforeEach(function () {
  const n = Cypress._.random(0, 5)
  cy.log(`will have ${n} todos`)
  cy.request('POST', '/reset', { n })
  cy.visit('/')
})

it('deletes all items', () => {
  cy.get('.todo-list li')
    .should(Cypress._.noop)
    .then(($list) => {
      if (!$list.length) {
        cy.log('No todos, nothing to delete')
      } else {
        $list.each((k, $el) => {
          cy.wrap($el).find('.destroy').click({ force: true })
        })
      }
    })
})
