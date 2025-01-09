
describe('Generate dynamic tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('Reset').click()
  })

  // generates 3 tests
  ;[1, 2, 3].forEach((nb) => {
    it(`should fill: ${nb} black squares`, () => {
      cy.fillNSquares(nb);

      
      cy.get('.cell').then(($cells) => {
        const blackSquareCount = Array.from($cells).reduce((acc, cell) => {
          return ('' + window.getComputedStyle(cell).backgroundColor === 'rgb(0, 0, 0)') ? acc + 1 : acc;
        }, 0);
  
        expect(blackSquareCount).to.equal(nb); // since commands are asynchronous, this has to be put inside the callback
      });
    })
  })
})