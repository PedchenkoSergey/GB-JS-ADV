// Материал второго урока:
class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="card" style="width: 18rem;">
            <img src="static/img/test.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${this.title}</h5>
              <p class="card-text">Price: ${this.price}</p>
              <a href="#" class="btn btn-primary">Add to cart</a>
            </div>
          </div>
          `;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
    ];
  }
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
}

class CartGoods {
  constructor() {
    this.goodsList = new GoodsList();
  }
  addItemToCart(itemGood){
    this.goodsList.goods.push(itemGood);
  }
  deleteItemFromCart() {

  }
  getTotalSum() {
    let totSum = 0;
    this.goodsList.goods.forEach(good => {
      totSum += good.price
    });
    return totSum;
  }
}

class CartElement {
  constructor(cartElement) {
    this.element = cartElement
  }
}

const list = new GoodsList();
list.fetchGoods();
list.render();

const cart = new CartGoods();
cart.addItemToCart(new GoodsItem('Shirt', 150))
cart.addItemToCart(new GoodsItem('Socks', 50))
cart.addItemToCart(new GoodsItem('Jacket', 350))
console.log(cart.getTotalSum())

