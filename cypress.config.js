const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    chromeWebSecurity: false,
    baseUrl: 'http://localhost:3000', // your site
    experimentalModifyObstructiveCode: true,

  },
});
