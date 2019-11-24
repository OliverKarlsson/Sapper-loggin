
describe('Deadlines API', () => {
    let tableInFocus, token;
    before(()=>{
      cy.request({
        method: 'POST',
        url: '/auth/register',
        headers: {
          'Content-Type': 'application/json',
        },
        failOnStatusCode: false,
        body: {
          name: "Tester",
          email: "test@table.se",
          password: "password"
        }
      });
      cy.request({
        method: 'POST',
        url: '/auth/login',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          email: "test@table.se",
          password: "password"
        }
      }).then((response) => {
        token = response.headers.authtoken;
        
      });
  });
    it('CREATE empty table', () => {
      cy.request({
        method: 'POST',
        url: '/tableAPI/create', // baseUrl is prepended to url
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          token: token,
          tableName:"table 1",
          categories: []
        }
      }).then((response) => {
        expect(response.body).to.have.property("tableName");
        tableInFocus = response.body._id;
      });
  });
  it('DELETE empty table', () => {
    cy.request({
      method: 'DELETE',
      url: '/tableAPI/drop',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        token: token,
        table:tableInFocus
      }
    }).then((response) => {
        expect(response.body).to.equal("Deleted table");
      });
   });
  it('CREATE full table', () => {
    cy.request({
      method: 'POST',
      url: '/tableAPI/create', // baseUrl is prepended to url
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        token: token,
        tableName:"table 2",
        categories: [
          {name:"cat 0", selected: true, rows:[{row:0,cell:"c0"},{row:2,cell:"c2"},{row:5,cell:"c5"},]},
          {name:"cat 1", selected: true, rows:[{row:0,cell:"c0"},{row:2,cell:"c2"},{row:5,cell:"c5"},]},
          {name:"cat 2", selected: false, rows:[{row:0,cell:"c0"},{row:2,cell:"c2"},{row:5,cell:"c5"},]},
          {name:"cat 3", selected: false, rows:[{row:0,cell:"c0"},{row:2,cell:"c2"},{row:5,cell:"c5"},]},
        ],
        
      }
    }).then((response) => {
        expect(response.body).to.have.property("tableName");
        expect(response.body.categories[0].name).to.eq("cat 0");
        tableInFocus = response.body._id;
      });
   });
   
   it('GET tables', () => {
    cy.request({
      method: 'POST',
      url: '/tableAPI/tables',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        token: token,
      }
    }).then((response) => {
        const last = response.body.length -1;
        expect(response.body[last]).to.have.property("owner");
        expect(response.body[last].tableName).to.equal("table 2");
        expect(response.body[last].categories[3].name).to.eql("cat 3");
        expect(response.body[last].categories[3].selected).to.eql(false);
        expect(response.body[last].categories[3].rows[0].row).to.equal(0);
        expect(response.body[last].categories[3].rows[0].cell).to.equal("c0");
        
      });
   });
   /*
   it('UPDATE table', () => {
    cy.request({
      method: 'PATCH',
      url: '/tableAPI/update',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        token: token,
        table:tableInFocus,
        tableName:"updated table",
        categories: ["updated ca1","ca2","ca3","ca4"],
        selections: [1,2],
        rows: [[{i:0,cell:"updated uno"},{i:1,cell:"dos"},{i:2,cell:"tres"},{i:3,cell:"cuatro"},],
        [{i:0,cell:"cinco"},{i:1,cell:"siez"},{i:2,cell:"siete"},{i:3,cell:"ocho"},]]
      }
    }).then((response) => {
        const last = response.body.length -1;
        expect(response.body).to.have.property("owner");
        expect(response.body.tableName).to.equal("updated table");
        expect(response.body.categories).to.eql(
            ["updated ca1","ca2","ca3","ca4"]);
        expect(response.body.selections).to.eql([1,2]);
        expect(response.body.rows[0][0].i).to.equal(0);
        expect(response.body.rows[0][0].cell).to.equal("updated uno");
      });
   });*/

   it('UPDATE', () => {
    cy.request({
      method: 'PATCH',
      url: '/tableAPI/update',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        token: token,
        table:tableInFocus,
        categories: [
          {name:"cat 0", selected: true, rows:[{row:0,cell:"c0"},{row:2,cell:"c2"},{row:5,cell:"c5"},]},
          {name:"cat 1", selected: true, rows:[{row:0,cell:"c0"},{row:2,cell:"c2"},{row:5,cell:"c5"},]},
          {name:"cat 3", selected: false, rows:[{row:0,cell:"c0"},{row:2,cell:"c2"},{row:5,cell:"c5"},]},
          {name:"cat 2", selected: true, rows:[{row:0,cell:"c0"},{row:2,cell:"c2"},{row:5,cell:"c5"},]},
          {name:"cat 4", selected: false, rows:[{row:0,cell:"c0"},{row:2,cell:"c2"},{row:5,cell:"c5"},]},
        ]
      }
      }).then((response) => {
          expect(response.body.categories[2].name).to.eql("cat 3");
          expect(response.body.categories[2].selected).to.eql(false);
          expect(response.body.categories[3].name).to.eql("cat 2");
          expect(response.body.categories[3].selected).to.eql(true);
          expect(response.body.categories[4].name).to.eql("cat 4");
          expect(response.body.categories[4].selected).to.eql(false);
      });
   });

   it('UPDATE categorie name', () => {
    
    cy.request({
      method: 'PATCH',
      url: '/tableAPI/update-categorie',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        token: token,
        table: tableInFocus,
        categorie: 0,
        name: "updated twice ca1"
      }
    }).then((response) => {
        expect(response.body.categories[0].name).to.eql("updated twice ca1");
      });
   });

   it('UPDATE single cell', () => {
    cy.request({
      method: 'PATCH',
      url: '/tableAPI/update-cell',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        token: token,
        table:tableInFocus,
        categorie: 0,
        row: 0,
        cell: "updated uno"
      }
    }).then((response) => {
        expect(response.body.categories[0].name).to.eql("updated twice ca1");
        expect(response.body.categories[0].selected).to.eql(true);
        expect(response.body.categories[0].rows[0].row).to.equal(0);
        expect(response.body.categories[0].rows[0].cell).to.equal("updated uno");
      });
   });

   it('DELETE single cell', () => {
    cy.request({
      method: 'DELETE',
      url: '/tableAPI/drop-cell',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        token: token,
        table:tableInFocus,
        categorie: 2,
        row:0
      }
      }).then((response) => {
          expect(response.body.categories[2].rows[0].cell).to.not.eql("c0");
      });
   });
   
   it('UPDATE single selection', () => {
    cy.request({
      method: 'PATCH',
      url: '/tableAPI/update-selection',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        token: token,
        table:tableInFocus,
        categorie: 0,
        selected: false
      }
    }).then((response) => {
      expect(response.body.categories[0].selected).to.eql(false);
      });
   });
   
   it('DELETE full table', () => {
    cy.request({
      method: 'DELETE',
      url: '/tableAPI/drop',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        token: token,
        table:tableInFocus
      }
    }).then((response) => {
        expect(response.body).to.equal("Deleted table");
      });
   });
});
  
  /*
      it('Get tables', () => {
      cy.request({
        method: 'GET',
        url: '/auth/table', // baseUrl is prepended to url
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          owner:"usr"
        }
      });
    }); 
      it('has multiple tables', () => {
            cy.get('table').should('have.class', 'deadlines');
      });
      
      
  
      it('has add row function', () => {
          cy.get('table').should('have.class', 'deadlines');
      });
  
      it('has add col function', () => {
          cy.get('table').should('have.class', 'deadlines');
      });
      
      
      
  
      it('has multiple focusable categories', () => {
          cy.get('table').should('have.class', 'deadlines');
      });
      
  
      it('has focus col function', () => {
          cy.get('table').should('have.class', 'deadlines');
      });
  
      it('interpret date-cells', () => {
          cy.get('table').should('have.class', 'deadlines');
      });
      
      */