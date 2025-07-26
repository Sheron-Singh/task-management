const request = require('supertest');
const app = require('../index');
const { sequelize } = require('../models');

let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await request(app).post('/register').send({
    fullname: 'Sheron',
    email: 'singh@example.com',
    password: '123456'
  });
  const loginRes = await request(app).post('/login').send({
    email: 'singh@example.com',
    password: '123456'
  });
  token = loginRes.body.token;
});

afterAll(async () => await sequelize.close());

describe('Tasks tests', () => {
  it('creates a task', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'My Task', description: 'Details', dueDate: '2025-08-01', status: 'pending' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('title', 'My Task');
  });

  it('retrieves tasks', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('updates a task', async () => {
    const tasks = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`);
    const taskId = tasks.body[0].id;

    const res = await request(app)
      .put(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'completed' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('completed');
  });
});
