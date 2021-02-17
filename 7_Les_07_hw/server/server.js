const express = require('express');
const app = express();
const fs = require('fs');
const logger = require('./logger');

const productFile = './db/0_products.json';
const cartFile = './db/1_cart.json';

/**
 * Активируем мидлвары
 */
app.use(express.json());
app.use('/', express.static('../public'));

/**
 * API Каталога
 */
app.get('/api/catalog', (req, res) => {
  fs.readFile(productFile, 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
      logger('read-catalog');
    }
  });
});

/**
 * API Корзины
 */
app.get('/api/cart', (req, res) => {
  fs.readFile(cartFile, 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
      logger('read-cart');
    }
  });
});

/**
 * Очистить корзину перед использованием
 */
app.get('/api/cart-clear', (req, res) => {
  fs.readFile(cartFile, 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);

      // очищаем корзину
      cart.amount = 0;
      cart.countGoods = 0;
      cart.contents = [];

      // пишем обратно
      fs.writeFile(cartFile, JSON.stringify(cart, null, 4), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
          logger('clear-cart');
        }
      })
    }
  });
});

// Добавить новый товар в корзину
app.post('/api/cart', (req, res) => {
  fs.readFile(cartFile, 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);

      // добавляем новый товар
      cart.contents.push(req.body);

      // обновляем корзину
      cart.countGoods++;
      cart.amount += req.body.amount;

      // пишем обратно
      fs.writeFile(cartFile, JSON.stringify(cart, null, 4), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
          logger('add-new-product', req.body);
        }
      })
    }
  });
});

// Удалить товар из корзины
app.delete('/api/cart', (req, res) => {
  fs.readFile(cartFile, 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);

      // удаляем искомый товар
      cart.contents.splice( cart.contents.indexOf(req.body), 1 );

      // обновляем корзину
      cart.countGoods--;
      cart.amount -= req.body.amount;

      // пишем обратно
      fs.writeFile(cartFile, JSON.stringify(cart, null, 4), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
          logger('delete-product', req.body);
        }
      })
    }
  });
});

// Изменить количество товара
app.put('/api/cart/:id', (req, res) => {
  fs.readFile(cartFile, 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);

      // изменяем количество
      const item = cart.contents.find(item => item.id === +req.params.id);
      if ( req.body.quantity > 0 ) { item.quantity++; }
      if ( req.body.quantity < 0 && item.quantity > 1 ) { item.quantity--; }
      item.amount = item.price * item.quantity;

      // обновляем корзину
      cart.amount = cart.contents.reduce( (sum, { amount }) => sum + amount, 0 );

      // пишем обратно
      fs.writeFile(cartFile, JSON.stringify(cart, null, 4), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
          logger('change-product', item);
        }
      })
    }
  });
});

/**
 * Запуск сервера
 * @type {string|number}
 */
// const port = process.env.PORT || 3000;
const port = 3000;
app.listen(port, () => {
  console.log(`Listening ${port} port`);
});
