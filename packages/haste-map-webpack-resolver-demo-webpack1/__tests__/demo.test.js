test('Package dependency is succesfully imported', () => {
    const {entryPoint} = require('../dist/entry-point.bundle');
    expect(entryPoint()).toBe('Dependency resolved');
});
