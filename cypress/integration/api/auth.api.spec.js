describe('User API', () => {
  it('LOGIN user before creation fails', () => {
    cy.request({
      method: 'POST',
      url: '/auth/login',
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,
      body: {
        email: "test@test.se",
        password: "password"
      }
    }).then((response) => {
      expect(response.status).eq(400)
    });
  });
  it('CREATE user', () => {
    cy.request({
      method: 'POST',
      url: '/auth/register',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        name: "Tester",
        email: "test@test.se",
        password: "password"
      }
    });
  });
  it('CREATING existing user fails', () => {
    cy.request({
      method: 'POST',
      url: '/auth/register',
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,
      body: {
        name: "Tester",
        email: "test@test.se",
        password: "password"
      }
    }).then((response) => {
      expect(response.status).eq(400)
    });
  });
  it('LOGIN user', () => {
    cy.request({
      method: 'POST',
      url: '/auth/login',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email: "test@test.se",
        password: "password"
      }
    });
  });
  it('LOGIN user, wrong password fails', () => {
    cy.request({
      method: 'POST',
      url: '/auth/login',
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,
      body: {
        email: "test@test.se",
        password: "wrong-password"
      }
    }).then((response) => {
      expect(response.status).eq(400)
    });
  });
  it('LOGOUT user', () => {
    cy.request({
      method: 'POST',
      url: '/auth/logout',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email: "test@test.se"
      }
    });
  });
  it('Update username and password', () => {
    cy.request({
      method: 'PATCH',
      url: '/auth/updateUser',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        name: "retseT",
        email: "test@test.se",
        password: "drowssap"
      }
    });
  });
  it('Update email', () => {
    cy.request({
      method: 'PATCH',
      url: '/auth/updateEmail',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email: "test@test.se",
        n_email: "test@test.com"
      }
    });
  });
  it('LOGIN old user fails', () => {
    cy.request({
      method: 'POST',
      url: '/auth/login',
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,
      body: {
        email: "test@test.com",
        password: "password"
      }
    }).then((response) => {
      expect(response.status).eq(400)
    });
  });
  it('LOGIN updated user', () => {
    cy.request({
      method: 'POST',
      url: '/auth/login',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email: "test@test.com",
        password: "drowssap"
      }
    });
  });
  it('LOGOUT updated user', () => {
    cy.request({
      method: 'POST',
      url: '/auth/logout',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email: "test@test.com"
      }
    });
  });
  it('DELETE user', () => {
    cy.request({
      method: 'DELETE',
      url: '/auth/drop',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email: "test@test.com"
      }
    });
  });
  it('DELETE non-existing user fails', () => {
    cy.request({
      method: 'DELETE',
      url: '/auth/drop',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email: "test@test.com"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).eq(400)
    });
  });
  it('LOGIN deleted user fails', () => {
    cy.request({
      method: 'POST',
      url: '/auth/login',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email: "test@test.com",
        password: "drowssap"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).eq(400)
    });
  });
  it('Update username and password after deletion fails', () => {
    cy.request({
      method: 'PATCH',
      url: '/auth/updateUser',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        name: "retseT",
        email: "test@test.com",
        password: "drowssap"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).eq(400)
    });
  });
  it('Update email after deletion fails', () => {
    cy.request({
      method: 'PATCH',
      url: '/auth/updateEmail',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email: "test@test.com",
        n_email: "test@test.se"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).eq(400)
    });
  }); 
});
