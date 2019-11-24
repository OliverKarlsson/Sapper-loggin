describe('administer page routes', () => {
	before(() => {
		cy.visit('/login');
		cy.get('#email')
			.type("test@table.se");
		cy.get('#password')
			.type("password");
        cy.get('button').contains('Log in').click();
        cy.wait(500);
        cy.get('Nav a').contains('administer').click();
	});

	it('has the correct <h1>', () => {
		cy.contains('h1', 'Administer');
	});

	it('navigates to /about and back', () => {
		cy.get('Nav a').contains('about').click();
        cy.url().should('include', '/about');
        cy.get('Nav a').contains('administer').click();
        cy.url().should('equal', 'http://localhost:3000/admin');
	});

	it('navigates to /deadlines and back', () => {
		cy.get('Nav a').contains('deadlines').click();
        cy.url().should('include', '/deadlines');
        cy.get('Nav a').contains('administer').click();
        cy.url().should('equal', 'http://localhost:3000/admin');
	});

	it('navigates to / and back', () => {
		cy.get('Nav a').contains('home').click();
        cy.url().should('equal', 'http://localhost:3000/');
        cy.get('Nav a').contains('administer').click();
        cy.url().should('equal', 'http://localhost:3000/admin');
	});
    
    it('fails to navigate to /login', () => {
        cy.get('#login').click({ force: true });
        cy.url().should('equal', 'http://localhost:3000/');
	});
	
	it('fails to navigate to /register', () => {
		cy.get('#register').click({ force: true });
        cy.url().should('equal', 'http://localhost:3000/');
	});

	it('logs out', () => {
        cy.get('Nav a').contains('log out').click();
        cy.url().should('equal', 'http://localhost:3000/login');
	});
});