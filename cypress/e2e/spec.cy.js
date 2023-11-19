/// <reference types="cypress" />

// use the plugin cypress-time-marks in this spec
import 'cypress-time-marks'

beforeEach(function () {
  // start with zero todos
  cy.request('POST', '/reset')
  cy.visit('/')
})

it('quickly adds an item', () => {
  // start measuring time before using cy.type
  // and confirm the item becomes visible
  // before 500ms elapses
  cy.get('input.new-todo').timeMark('addStart').type('an item{enter}')
  cy.contains('li.todo', 'an item')
    .should('be.visible')
    .timeSince('addStart', 'adding an item', 500, true)
})
