const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(async() => {
    return await Order.insert(3);
  });
  afterAll(() => {
    return pool.end();

  });



  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then(res => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: expect.any(String),
          quantity: 10
        });
      });
  });

  it('responds with an array of all orders', () => {
    return request(app).get('/api/v1/orders')
      .then(res => {
        expect(res.body).toEqual([{
          id: expect.any(String),
          quantity: 3
        }]);
      });
  });

  it('Responds with an order object with the given id', () => {
    return request(app).get('/api/v1/orders/1')
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          quantity: 3
        });
      });
  });

  it('updates an order with given id', async() => {
    const res = await request(app).patch('/api/v1/orders/1').send({ quantity: 7 });

    expect(res.body).toEqual({ id: '1', quantity: 7 });

  });

  it('deletes order', async() => {
    const res = await request(app).delete('/api/v1/orders/1');

    expect(res.body).toEqual({ id: expect.any(String), quantity: 3 });

  });




});
