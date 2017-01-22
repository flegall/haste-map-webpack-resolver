test('Package dependency is succesfully imported', () => {
    const {entryPoint} = require('../dist/entry-point.bundle');
    console.log(entryPoint());
    expect(entryPoint()).toBe('Dependency resolved');
});
