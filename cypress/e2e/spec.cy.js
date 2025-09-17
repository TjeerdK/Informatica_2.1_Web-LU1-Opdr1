describe('Homepage', () => {
  it('should load the homepage', () => {
    cy.visit('http://localhost:3000', { timeout: 10000 });
    cy.get('nav.navbar').should('be.visible');
    cy.contains('Movie catalog').should('be.visible');
  });
});