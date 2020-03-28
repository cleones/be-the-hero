const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connectiom');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });
  it('should be able to create a new ONG', async () => {
    const { body } = await request(app)
      .post('/ongs')
      .send({
        name: 'Tia Eva',
        email: 'tiaeva@gcom.br',
        whatsapp: '+5567984418806',
        city: 'Campo Grande',
        uf: 'MS'
      });
    expect(body).toHaveProperty('id');
    expect(body.id).toHaveLength(8);
  });
});
