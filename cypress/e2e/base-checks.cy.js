describe('Base Checks', () => {
    it('Site responds successfully', () => {
        cy.visit('/');
        cy.title().should('eq', 'Craig Wayne Portfolio');
    })

    it('Favicon', () => {
        cy.get('link[rel="shortcut icon"]').should('be.exist');
    })
})