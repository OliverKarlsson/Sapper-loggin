describe('Login page', () => {
	beforeEach(() => {
        cy.clearCookies();
        cy.visit('/login');
	});

	it('has the correct <h1>', () => {
		cy.contains('h1', 'Login')
	});

	it('has the guest login option', () => {
		cy.contains('Or login as guest.')
	});

    it('fails to log in user with wrong email', () => {
		cy.get('[data-cy=email]')
			.type("test@table");
		cy.get('[data-cy=password]')
			.type("password");
		cy.get("[data-cy=logsin]").click();
        cy.contains('Wrong username or password.');
		cy.url().should('equal', 'http://localhost:3000/login');
    });
    
    it('fails to log in user with wrong password', () => {
		cy.get('[data-cy=email]')
			.type("test@table.se");
		cy.get('[data-cy=password]')
			.type("pass");
		cy.get("[data-cy=logsin]").click();
        cy.contains('Wrong username or password.');
		cy.url().should('equal', 'http://localhost:3000/login');
	});

	it('logs in user', () => {
		cy.get('[data-cy=email]')
			.type("test@table.se");
		cy.get('[data-cy=password]')
			.type("password");
		cy.get("[data-cy=logsin]").click();
		cy.url().should('equal', 'http://localhost:3000/');
	});
});