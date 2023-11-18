const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '87ded313-a717-4620-bffe-12805ba8fe17',
  video: false,
  fixturesFolder: false,
  e2e: {
    setupNodeEvents (on, config) {},
    supportFile: false,
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}'
  }
})
