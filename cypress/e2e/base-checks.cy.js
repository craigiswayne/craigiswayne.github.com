describe('Base Checks', () => {

    before(() => {
        cy.visit('/');
    })

    it('Head tag checks', () => {
        cy.title().should('eq', 'Craig Wayne Portfolio');
        cy.get('head link[rel="shortcut icon"]').should('be.exist');
        cy.get('head meta[name="description"]').should('exist');
    })

    it('Header', () => {
        cy.get('nav .container .flex > button.text-lg')
            .should('be.visible')
            .should('have.text', 'Craig Wayne');

        cy.get('nav .container .flex .hidden.md\\:flex button:first-child')
            .should('be.visible')
            .should('have.text', 'About');

        cy.get('nav .container .flex .hidden.md\\:flex button:nth-child(2)')
            .should('be.visible')
            .should('have.text', 'Skills');

        cy.get('nav .container .flex .hidden.md\\:flex button:nth-child(3)')
            .should('be.visible')
            .should('have.text', 'Projects');

        cy.get('nav .container .flex .hidden.md\\:flex button:nth-child(4)')
            .should('be.visible')
            .should('have.text', 'Experience');

        cy.get('nav .container .flex .hidden.md\\:flex button:nth-child(5)')
            .should('be.visible')
            .should('have.text', 'Contact');

        cy.get('nav a[download]')
            .should('be.visible')
            .should('contain.text', 'Download Resume')
            .should('have.attr', 'download', 'Resume-CraigWayneGovender.pdf');

    })

    it('Header scroll navigation', () => {
        cy.get('nav .container .flex .hidden.md\\:flex button:first-child')
            .click()
        cy.window().its('scrollY').should('be.greaterThan', 0);

        cy.wait(500);

        cy.get('nav .container .flex > button.text-lg')
            .click();

        cy.window().its('scrollY').should('eq', 0);

        cy.wait(500);

        cy.get('nav .container .flex .hidden.md\\:flex button:nth-child(2)')
            .click()
        cy.window().its('scrollY').should('be.greaterThan', 0);

        cy.wait(500);

        cy.get('nav .container .flex > button.text-lg')
            .click();

        cy.window().its('scrollY').should('eq', 0);

        cy.wait(500);

        cy.get('nav .container .flex .hidden.md\\:flex button:nth-child(3)')
            .click()
        cy.window().its('scrollY').should('be.greaterThan', 0);

        cy.wait(500);

        cy.get('nav .container .flex > button.text-lg')
            .click();

        cy.window().its('scrollY').should('eq', 0);

        cy.wait(500);

        cy.get('nav .container .flex .hidden.md\\:flex button:nth-child(4)')
            .click()
        cy.window().its('scrollY').should('be.greaterThan', 0);

        cy.wait(500);

        cy.get('nav .container .flex > button.text-lg')
            .click();

        cy.window().its('scrollY').should('eq', 0);

        cy.wait(500);

        cy.get('nav .container .flex .hidden.md\\:flex button:nth-child(5)')
            .click()
        cy.window().its('scrollY').should('be.greaterThan', 0);

        cy.wait(500);

        cy.get('nav .container .flex > button.text-lg')
            .click();

        cy.window().its('scrollY').should('eq', 0);
    })
})
