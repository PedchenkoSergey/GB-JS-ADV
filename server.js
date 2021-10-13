const express = require('express');
const fs = require('fs');
const format = require('date-fns/format')

// format(new Date(), 'dd-MM-yyyy HH:mm:ss')

const app = express();

app.use(express.static('.'));
app.use(express.json());

app.get('/catalogData', (req, res) => {
  fs.readFile('catalog.json', 'utf8', (err, data) => {
    res.send(data);
  });
});

app.get('/getBasket', (req, res) => {
  fs.readFile('cart.json', 'utf8', (err, data) => {
    res.send(data);
  });
});

app.post('/addToCart', (req, res) => {
  fs.readFile('cart.json', 'utf8', (err, data) => {
    const cart = JSON.parse(data);
    const item = req.body;

    let inBasket = false; // Check the item is already in basket
    for (let i = 0; i < cart.contents.length; i++) {
      if (item.id_product === cart.contents[i].id_product) {  // Проверяем есть ли уже элемент в корзине
        cart.contents[i].quantity += 1  // Если есть - то увеличиваем количество на 1 шт
        inBasket = true
      }
    }
    if (!inBasket) {
      item.quantity = 1;  // Если есть нет - то количество в объекте - 1 шт
      cart.contents.push(item); // добравляем элемент в корзину
    }

    let initialValue = 0
    cart.amount = cart.contents.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity, initialValue
    );
    cart.countGoods = cart.contents.length

    fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
      if (err) {
        res.send('{"result": 0}');
      } else {
        res.send('{"result": 1}');
      }
    });

    fs.readFile('stats.json', 'utf-8', (err, data) => {
      const stats = JSON.parse(data)
      const new_data = {
        "date": format(new Date(), 'dd-MM-yyyy HH:mm:ss'),
        "action": "AddToCart",
        "good name": item.product_name
      }

      stats.push(new_data)

      fs.writeFile('stats.json', JSON.stringify(stats), (err) => {
        if (err) {
          console.log("Error during writing stats")
        }
      })
    });

  });
});

app.post('/deleteFromBasket', (req, res) => {
  fs.readFile('cart.json', 'utf8', (err, data) => {
    const cart = JSON.parse(data);
    const item = req.body;

    for (let i = 0; i < cart.contents.length; i++) {
      if (item.id_product === cart.contents[i].id_product) {  // Проверяем на совпадение id
        cart.contents[i].quantity -= 1  // Если есть - то уменьшаем количество на 1 шт
        if (cart.contents[i].quantity === 0) {  // Если количество закончилось
          cart.contents.splice(i, 1)
        }
      }
    }

    let initialValue = 0
    cart.amount = cart.contents.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity, initialValue
    );
    cart.countGoods = cart.contents.length

    fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
      if (err) {
        res.send('{"result": 0}');
      } else {
        res.send('{"result": 1}');
      }
    });

    fs.readFile('stats.json', 'utf-8', (err, data) => {
      const stats = JSON.parse(data)
      const new_data = {
        "date": format(new Date(), 'dd-MM-yyyy HH:mm:ss'),
        "action": "DeleteFromCart",
        "good name": item.product_name
      }

      stats.push(new_data)

      fs.writeFile('stats.json', JSON.stringify(stats), (err) => {
        if (err) {
          console.log("Error during writing stats")
        }
      })
    });

  });
});

app.listen(3000, function() {
  console.log('server is running on port 3000!');
});