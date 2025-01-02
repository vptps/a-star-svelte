describe('Test A *', () => {
  it('Visits aStarSvelte, check default appMenu values and run the a star algo', () => {
    cy.visit('localhost:5173')

    cy.contains('Start algo').click()

    cy.get('input[name="gridSize"]').as('gridSize').should('have.value', '20')
    cy.get('input[name="cellSize"]').as('cellSize').should('have.value', '25')
    cy.get('input[name="speed"]').as('speed').should('have.value', '5')
    // using "as" we have an alias, we could now use cy.get('@speed')
  })

  it('modifies appMenu inputs and checks that the algo gave a successful result', () => {
    cy.visit('localhost:5173')

    cy.get('input[name="speed"]') // type range, can not just .type()
      .invoke('val', 8)
      .trigger('input')
      .trigger('change'); 

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
    cy.visit('localhost:5173')

    cy.drawImpossibleSmallLabyrinth();
    // this custom command does that:
    // cy.get('input[name="gridSize"]') // type range
    //   .invoke('val', 5)
    //   .trigger('input')
    //   .trigger('change'); 

    // // TODO, mettre dans une fonction
    // cy.get('.cell').each((cell, idx) => {
    //   if (idx >= 10 && idx <= 14) {
    //     cy.wrap(cell).trigger('mousedown') // don't forget to cy.wrap, each returns DOM elements, not cypress objects
    //   }
    // })
    // cy.get('.cell').first().trigger('mouseup')
    // // we could also trigger mouseup on the row, but we would need to use { force: true }, because the row has a height: 0

    cy.wait(500)
    cy.contains('Start algo').click()
    cy.wait(1500) // algo runs

    cy.get('.cell').then(($cells) => {
      // if purple background was added via a class, we could have
      // cy.get('.cell.purple').should('not.exist')
      const hasPurpleBackground = Array.from($cells).some((cell) => {
        return ('' + window.getComputedStyle(cell).backgroundColor === 'rgb(128, 0, 128)');
      });

      expect(hasPurpleBackground).to.be.false; // mocha style assertion
    });
  });

  it('Create a solvable labyrinth, and solves it', () => {
    cy.visit('localhost:5173')

    
  });
})