const request = require('supertest');
const app = require('../index');
const { sequelize } = require('../models');

beforeAll(async () => await sequelize.sync({ force: true }));
afterAll(async () => await sequelize.close());

describe('Auth tests', () => {
  it('registers user', async () => {
    const res = await request(app).post('/register').send({
      fullname: 'Sheron Singh',
      email: 'sheron@example.com',
      password: '123456',
      profileImage: '',
      dob: '1990-01-01',
      phone: '1234567890'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('logs in and returns a JWT', async () => {
    const res = await request(app).post('/login').send({
      email: 'sheron@example.com',
      password: '123456'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
