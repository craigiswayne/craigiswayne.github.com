describe('Base Checks', () => {

    before(() => {
        cy.visit('/');
    })

    it('Head tag checks', () => {
        cy.request('GET', '/robots.txt')
            .then((response) => {
                expect(response.status).to.eq(200);
            });
    })
})