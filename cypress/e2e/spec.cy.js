// we can add test config in both describe and it blocks, here ie:exclude edge
describe('Test A *', { browser: '!edge' }, () => {
  before(() => {
    // we could visit just once if we disabled testIsolation in describe configuration just above
    // cy.visit('localhost:5173')
  })

  beforeEach(() => {
    cy.log('cy.log beforeEach, located in spec file, visiting localhost')
    cy.visit('/')
    
    // we can define aliases in beforeEach hook, and use them later
    cy.get('input[name="gridSize"]').as('gridSize')
    cy.get('input[name="cellSize"]').as('cellSize')
    cy.get('input[name="speed"]').as('speed')
    // using "as" we have an alias, we could now use cy.get('@speed')
  })

  it('Visits aStarSvelte, check default appMenu values and run the a star algo', () => {
    cy.contains('Start algo').click()

    cy.get('@gridSize').should('have.value', '20') // this.gridSize would only work if not using arrow functions
    cy.get('@cellSize').should('have.value', '25')
    cy.get('@speed').should('have.value', '5')
      .and(($speed) => { // same assertion, but mocha style and using the and() assertion
        expect($speed.get(0).value).to.equal('5')
      })
    // aliases are not kept through tests unless set in hooks, see before hook above
  })

  it('modifies appMenu inputs and checks that the algo gave a successful result', () => {
    cy.get('@speed') // type range, can not just .type()
      .invoke('val', 8)
      .trigger('input')
      .trigger('change'); 

    // cy.pause()
    cy.contains('Start algo').click()

    cy.wait(1500) // algo runs

    cy.get('.cell').then(($cells) => {
      const hasPurpleBackground = Array.from($cells).reduce((acc, cell) => {
        return ('' + window.getComputedStyle(cell).backgroundColor === 'rgb(128, 0, 128)') ? acc + 1 : acc;
      }, 0);

      expect(hasPurpleBackground).to.equal(16); // since commands are asynchronous, this has to be put inside the callback
    });
  })

  it('Create an impossible labyrinth with no solution', () => {
    cy.drawImpossibleSmallLabyrinth();
    cy.contains('Start algo').click();
    cy.wait(1500) // algo runs

    cy.get('.cell').should('not.assertSolved');
  });

  it('Create a solvable labyrinth, and solves it after a while', () => {
    // use custom command and fixtures
    cy.drawSolvableLabyrinth();
    cy.contains('Start algo').click()
    cy.wait(1500) // algo runs but is not completed yet
    cy.get('.cell').should('not.assertSolved'); // custom chai assertion
    cy.wait(8000)
    cy.get('.cell').should('assertSolved');
  });

  // when adding a new test and writing it, use it.only to onyl play it
  // also possible to use it.skip to avoid replaying longer tests
})