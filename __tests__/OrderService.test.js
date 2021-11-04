const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const Order = require('../lib/models/Order');
const OrderService = require('../lib/services/OrderService');
// const { update } = require('../lib/models/Order');




describe('get all', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(async() => {
    return await Order.insert(3);
  });

  it('creates order and sends message', async() => {
    const newOrder = await OrderService.createOrder(1);



    expect(newOrder).toEqual({ id: expect.any(String), quantity: 1 });
  });

  it('updates order and sends message', async() => {
    const updateOrder = await OrderService.updateOrder(1, 3);



    expect(updateOrder).toEqual({ id: '1', quantity: 3 });
  });

  it('gets all orders and sends message', async() => {
    const getAllOrders = await OrderService.getAll();



    expect(getAllOrders).toEqual([{ id: '1', quantity: 3 }]);
  });

  it('gets order by id and sends message', async() => {
    const getOrderById = await OrderService.getById(1);



    expect(getOrderById).toEqual({ id: '1', quantity: 3 });
  });

  it('deletes order and sends message', async() => {
    const deleteOrder = await OrderService.deleteOrder(1);



    expect(deleteOrder).toEqual({ id: '1', quantity: 3 });
  });


});
