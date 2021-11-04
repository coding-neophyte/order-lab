const { Router } = require('express');
const OrderService = require('../services/OrderService');

module.exports = Router()
  // if (req.method === 'POST' && req.url === '/api/v1/orders/')
  .post('/', async(req, res, next) => {
    try {
      // req.body === { quantity: 10 }
      const order = await OrderService.createOrder(req.body.quantity);
      // order === { id: '1', quantity: 10 }

      res.send(order);
    } catch(err) {
      next(err);
    }
  })

  .get('/', async(req, res, next) => {
    try {

      const getAllOrders = await OrderService.getAll();


      res.send(getAllOrders);
    } catch(err) {
      next(err);
    }
  })


  .get('/:id', async(req, res, next) => {
    try {

      const getOrderById = await OrderService.getById(req.params.id);


      res.send(getOrderById);
    } catch(err) {
      next(err);
    }
  })

  .patch('/:id', async(req, res, next) => {
    try {
      const updateOrder = await OrderService.updateOrder(req.body.quantity, req.params.id);

      res.send(updateOrder);
    } catch(err){
      next(err);
    }

  })

  .delete('/:id', async(req, res, next) => {
    try {
      const deleteOrder = await OrderService.deleteOrder(req.params.id);

      res.send(deleteOrder);
    } catch(err){
      next(err);
    }
  });
