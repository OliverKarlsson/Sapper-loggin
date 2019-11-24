describe('deadlines page routes', () => {
	before(() => {
		cy.visit('/login');
		cy.get('[data-cy=email]')
			.type("test@table.se");
		cy.get('[data-cy=password]')
			.type("password");
		cy.get("[data-cy=logsin]").click();
        cy.wait(500);
        cy.get('[data-cy=nav]').contains('deadlines').click();
	});

	it('has the correct <table>', () => {
		cy.get('[data-cy=deadlines-table]');
	});

	it('Add new table', () => {
		cy.get('[data-cy=new-table]').click();
		cy.window()
			.then(win => {
				cy.stub(win, 'prompt').returns('The value you write inside prompt')
				cy.get('#save-changes-in-gui-button').click();
				//... Saved value assert
			})
	});

	
});