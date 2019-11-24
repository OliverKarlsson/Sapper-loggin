describe('about page routes', () => {
	before(() => {
		cy.visit('/login');
		cy.get('#email')
			.type("test@table.se");
		cy.get('#password')
			.type("password");
        cy.get('button').contains('Log in').click();
        cy.wait(500);
        cy.get('[data-cy=nav]').contains('about').click();
    });

	it('has the correct <h1>', () => {
		cy.contains('h1', 'About');
	});

	it('navigates to / and back', () => {
        cy.get('[data-cy=nav]').contains('home').click();
        cy.url().should('equal', 'http://localhost:3000/');
        cy.get('[data-cy=nav]').contains('about').click();
        cy.url().should('equal', 'http://localhost:3000/about');
	});

	it('navigates to /deadlines and back', () => {
		cy.get('Nav a').contains('deadlines').click();
        cy.url().should('include', '/deadlines');
        cy.get('Nav a').contains('about').click();
        cy.url().should('equal', 'http://localhost:3000/about');
	});

	it('navigates to /admin and back', () => {
		cy.get('Nav a').contains('administer').click();
        cy.url().should('include', '/admin');
        cy.get('Nav a').contains('about').click();
        cy.url().should('equal', 'http://localhost:3000/about');
	});

	it('fails to navigate to /login', () => {
        cy.get('[data-cy=login]').click({ force: true });
        cy.url().should('equal', 'http://localhost:3000/');
	});
	
	it('fails to navigate to /register', () => {
		cy.get('[data-cy=register]').click({ force: true });
        cy.url().should('equal', 'http://localhost:3000/');
	});

	it('logs out', () => {
        cy.get('[data-cy=nav]').contains('log out').click();
        cy.url().should('equal', 'http://localhost:3000/login');
	});
});