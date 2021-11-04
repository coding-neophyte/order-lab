const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const Order = require('../lib/models/Order');


describe('get all', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(async() => {
    return await Order.insert(3);
  });

  it('adds a new order', async() => {
    const expected =

        { id: expect.any(String), quantity: expect.any(Number) };


    expect(await Order.insert(2)).toEqual(expected);
  });

  it('returns an array of orders', async() => {
    const expected =
      [
        { id: expect.any(String), quantity: expect.any(Number) }
      ];

    expect(await Order.selectAll()).toEqual(expected);
  });

  it('returns an order by id', async() => {
    const expected =

        { id: expect.any(String), quantity: expect.any(Number) };


    expect(await Order.selectById(1)).toEqual(expected);
  });

  it('updates an order', async() => {
    const expected =

        { id: expect.any(String), quantity: expect.any(Number) };


    expect(await Order.update(1, 1)).toEqual(expected);
  });

  it('delets an order', async() => {
    const expected =

        { id: expect.any(String), quantity: expect.any(Number) };


    expect(await Order.delete(1)).toEqual(expected);
  });


});
