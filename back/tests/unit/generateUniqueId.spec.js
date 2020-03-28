const generateUniqueId = require('../../src/util/generateUniqueId');
describe('Generete Unique ID', () => {
  const id = generateUniqueId();
  it('show generate an unique ID', () => {
    expect(id).toHaveLength(8);
  });
});
