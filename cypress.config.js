const {defineConfig} = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:4173',
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
        supportFile: false,
        testIsolation: false,
        viewportWidth: 1920,
        viewportHeight: 1080
    },
    video: false,
    screenshotOnRunFailure: true,
})