'use strict'

// const la = require('lazy-ass')
// const is = require('check-more-types')

describe('a cy unit test', function () {
  it('is ok', function () {
    expect(true).to.be.true
  })

  it('understands arrow functions', () => {
    expect(false).to.be.false
  })
})

describe('todomvc app', () => {
  it('can load the app', () => {
    cy.visit('http://localhost:3000')
  })
})
