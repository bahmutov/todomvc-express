/// <reference types="cypress" />

import { recurse } from 'cypress-recurse'

beforeEach(function () {
  const n = Cypress._.random(0, 5)
  cy.log(`will have ${n} todos`)
  cy.request('POST', '/reset', { n })
  cy.visit('/')
})

it('deletes all items', () => {
  // use cypress-recurse function "recurse"
  // to delete the last Todo item
  // until there are no items left
  // make sure to confirm the N-1 todos remaining
  // after clicking the destroy button
  recurse(
    () => cy.get('.todo-list li').should(Cypress._.noop).its('length'),
    (n) => n === 0,
    {
      log: false,
      // use higher timeout because deleting
      // 5 items might take longer than the default command timeout
      timeout: 6_000,
      post({ value }) {
        cy.get('.todo-list li').last().find('.destroy').click({ force: true })
        cy.get('.todo-list li').should('have.length', value - 1)
      },
    },
  )

  // confirm there are no todos
  cy.get('.todo-list li').should('not.exist')
})
