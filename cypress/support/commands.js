// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('drawImpossibleSmallLabyrinth', () => {
  cy.get('input[name="gridSize"]') // type range needs to be handled this way
    .invoke('val', 5)
    .trigger('input')
    .trigger('change'); 

  cy.get('.cell').each((cell, idx) => {
    if (idx >= 10 && idx <= 14) {
      cy.wrap(cell).trigger('mousedown') // don't forget to cy.wrap, each returns DOM elements, not cypress objects
    }
  })
  cy.get('.cell').first().trigger('mouseup')
  // we could also trigger mouseup on the row, but we would need to use { force: true }, because the row has a height: 0
});

Cypress.Commands.add('drawSolvableLabyrinth', () => {
  cy.get('input[name="gridSize"]') // here we can not (and should not anyway) use aliases defined in spec files
    .invoke('val', 20)
    .trigger('input')
    .trigger('change');

  // get the labyrinth coordinates from a fixture file
  cy.fixture('labyrinth').then((labyrinth) => {
    const pathIndices = labyrinth.cells

    cy.get('.cell').each((cell, idx) => {
      if (pathIndices.includes(idx)) {
        cy.wrap(cell).trigger('mousedown');
      }
    });

    cy.get('.cell').first().trigger('mouseup');
  });
});

Cypress.Commands.add('fillNSquares', (nb) => {
  cy.get('input[name="gridSize"]') // type range
    .invoke('val', 5)
    .trigger('input')
    .trigger('change');

  cy.get('.cell').each((cell, idx) => {
    if (idx < nb) {
      cy.wrap(cell).trigger('mousedown')
    }
  })
  cy.get('.cell').first().trigger('mouseup')
});
