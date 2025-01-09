// example directly from cypress's doc
// should be quite self explanatory
// we use tests configuration to defined/overwrite variables according to browser
describe(
  'When in Firefox',
  {
    browser: 'firefox',
    viewportWidth: 1024,
    viewportHeight: 700,
    env: {
      DEMO: true,
      API: 'http://localhost:9000',
    },
  },
  () => {
    it('Sets the expected viewport and API URL', () => {
      expect(cy.config('viewportWidth')).to.equal(1024)
      expect(cy.config('viewportHeight')).to.equal(700)
      expect(cy.env('API')).to.equal('http://localhost:9000')
    })

    it(
      'Uses the closest API environment variable',
      {
        env: {
          API: 'http://localhost:3003',
        },
      },
      () => {
        expect(cy.env('API')).to.equal('http://localhost:3003')
        // other environment variables remain unchanged
        expect(cy.env('DEMO')).to.be.true
      }
    )
  }
);
