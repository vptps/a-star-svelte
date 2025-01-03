chai.Assertion.addMethod('assertSolved', function () {
  const subject = this._obj;

  // Check if any cell has a purple background
  const hasPurpleBackground = Array.from(subject).some((cell) => {
    return window.getComputedStyle(cell).backgroundColor === 'rgb(128, 0, 128)';
  });

  // Create assertion
  this.assert(
    hasPurpleBackground,
    'expected at least one cell to have a purple background',
    'expected no cells to have a purple background'
  );
});
