const name="Tester",
    email="test@register.se",
    password="password";

describe('Register page', () => {
    before(()=>{
        cy.request({
            method: 'DELETE',
            failOnStatusCode: false,
            url: '/auth/drop',
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              email: email
            }
          });
    });
    beforeEach(() => {
        cy.clearCookies();
        cy.visit('/register');
	});

	it('has the correct <h1>', () => {
		cy.contains('h1', 'Register')
	});
    
    it('fails to register user without name, email and password', () => {
        cy.wait(500);
        cy.get('[data-cy=registers]').click();
        
        cy.contains('"name" is not allowed to be empty');
        cy.url().should('equal', 'http://localhost:3000/register');
    });

    it('fails to register user without email and password', () => {
        cy.get('[data-cy=name]').type(name);
        cy.get('[data-cy=registers]').click();
        cy.contains('"email" is not allowed to be empty');
        cy.url().should('equal', 'http://localhost:3000/register');
    });

    it('fails to register user without password', () => {
        cy.get('[data-cy=name]').type(name);
        cy.get('[data-cy=email]').type(email);
        cy.get('[data-cy=registers]').click();
        cy.contains('"password" is not allowed to be empty');
        cy.url().should('equal', 'http://localhost:3000/register');
    });

    it('fails to register user without name and email', () => {
		cy.get('[data-cy=password]')
			.type(password);
        cy.get('[data-cy=registers]').click();
        cy.contains('"name" is not allowed to be empty');
        cy.url().should('equal', 'http://localhost:3000/register');
    });

    it('fails to register user without email', () => {
        cy.get('[data-cy=name]')
			.type(name);
		cy.get('[data-cy=password]')
			.type(password);
        cy.get('[data-cy=registers]').click();
        cy.contains('"email" is not allowed to be empty');
        cy.url().should('equal', 'http://localhost:3000/register');
    });

    it('fails to register user without name', () => {
        cy.get('[data-cy=email]')
			.type(email);
		cy.get('[data-cy=password]')
			.type(password);
        cy.get('[data-cy=registers]').click();
        cy.contains('"name" is not allowed to be empty');
        cy.url().should('equal', 'http://localhost:3000/register');
    });

    it('fails to register a user that already exists', () => {
        cy.get('[data-cy=name]')
			.type("Tester");
        cy.get('[data-cy=email]')
			.type("test@table.se");
		cy.get('[data-cy=password]')
			.type("password");
        cy.get('[data-cy=registers]').click();
        cy.contains('User with email already exists.');
        cy.url().should('equal', 'http://localhost:3000/register');
    });

    it('register user', () => {
        cy.get('[data-cy=name]')
			.type(name);
        cy.get('[data-cy=email]')
			.type(email);
		cy.get('[data-cy=password]')
			.type(password);
        cy.get('[data-cy=registers]').click();
        cy.contains('Thank you for joining us.');
        cy.url().should('equal', 'http://localhost:3000/register');
    });

    it('logs in user', () => {
        cy.get('[data-cy= login]').click();
        cy.clearCookies();
        cy.get('[data-cy=email]')
			.type(email);
		cy.get('[data-cy=password]')
			.type(password);
		cy.get('[data-cy=logsin]').click();
		cy.url().should('equal', 'http://localhost:3000/');
	});
});