describe('public page routes', () => {
    before(() => {
		cy.visit('/register');
    });
    it('navigates to /login', () => {
		cy.get('[data-cy=login]').click();
		cy.url().should('equal', 'http://localhost:3000/login');
    });
    it('nav navigates to /register', () => {
		cy.get('[data-cy=nav]').contains('register').click();
		cy.url().should('equal', 'http://localhost:3000/register');
    });
    it('nav navigates to /login', () => {
		cy.get('[data-cy=nav]').contains('login').click();
		cy.url().should('equal', 'http://localhost:3000/login');
    });
    
    it('fails to navigate to /', () => {
        cy.visit('/', {failOnStatusCode: false});
        cy.url().should('equal', 'http://localhost:3000/login');
    });
    it('fails to navigate to /about', () => {
        cy.visit('/about', {failOnStatusCode: false});
        cy.url().should('equal', 'http://localhost:3000/login');
    });
    it('fails to navigate to /deadlines', () => {
        cy.visit('/deadlines', {failOnStatusCode: false});
        cy.url().should('equal', 'http://localhost:3000/login');
    });
    it('fails to navigate to /administer', () => {
        cy.visit('/admin', {failOnStatusCode: false});
        cy.url().should('equal', 'http://localhost:3000/login');
	});
});

describe('private page routes', () => {
	before(() => {
		cy.visit('/login');
		cy.get('[data-cy=email]')
			.type("test@table.se");
		cy.get('[data-cy=password]')
			.type("password");
		cy.get("[data-cy=logsin]").click();
    });

	it('navigates from / to all and back', () => {
        //about
        cy.get('[data-cy=nav]').contains('about').click();
        cy.url().should('equal', 'http://localhost:3000/about');
        cy.get('[data-cy=nav]').contains('home').click();
        cy.url().should('equal', 'http://localhost:3000/');
        //deadlines
        cy.get('[data-cy=nav]').contains('deadlines').click();
        cy.url().should('equal', 'http://localhost:3000/deadlines');
        cy.get('[data-cy=nav]').contains('home').click();
        cy.url().should('equal', 'http://localhost:3000/');
        //administer
        cy.get('[data-cy=nav]').contains('administer').click();
        cy.url().should('equal', 'http://localhost:3000/admin');
        cy.get('[data-cy=nav]').contains('home').click();
        cy.url().should('equal', 'http://localhost:3000/');
    });
    
    it('navigates from /admin to all and back', () => {
        cy.get('[data-cy=nav]').contains('administer').click();
        //about
        cy.get('[data-cy=nav]').contains('about').click();
        cy.url().should('equal', 'http://localhost:3000/about');
        cy.get('[data-cy=nav]').contains('administer').click();
        cy.url().should('equal', 'http://localhost:3000/admin');
        //deadlines
        cy.get('[data-cy=nav]').contains('deadlines').click();
        cy.url().should('equal', 'http://localhost:3000/deadlines');
        cy.get('[data-cy=nav]').contains('administer').click();
        cy.url().should('equal', 'http://localhost:3000/admin');
	});

    it('navigates from /deadlines to all and back', () => {
        cy.get('[data-cy=nav]').contains('deadlines').click();
        //about
        cy.get('[data-cy=nav]').contains('about').click();
        cy.url().should('equal', 'http://localhost:3000/about');
        cy.get('[data-cy=nav]').contains('deadlines').click();
        cy.url().should('equal', 'http://localhost:3000/deadlines');
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