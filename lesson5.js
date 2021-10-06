
const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: '',
    API_URL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
    API_CATALOG: '/catalogData.json', //– получить список товаров;
    API_BASKET: '/getBasket.json', //– получить содержимое корзины;
    API_ADD_BASKET: '/addToBasket.json', // – добавить товар в корзину;
    API_DELETE_BASKET: '/deleteFromBasket.json' //– удалить товар из корзины.
  },
  methods: {
    makeGETRequest(url) {
      return new Promise((resolve, reject) =>{
        let xhr;

        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            }
            else {reject(`Status is not 200: ${xhr.status}`)}
          }
        }

        xhr.open('GET', url, true);
        xhr.send();
      })
    }
  },
  mounted() {
    this.makeGETRequest(`${this.API_URL}/${this.API_CATALOG}`)
        .then((goods) => {
          this.goods = JSON.parse(goods);
          this.filteredGoods = JSON.parse(goods);
        })
        .catch((err) => console.log(`Error: ${err}`))
  }

});




class GoodsItem {
  constructor(product_name, price) {
    this.product_name = product_name;
    this.price = price;
  }
  render() {
    return `<div class="card" style="width: 18rem;">
            <img src="static/img/test.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${this.product_name}</h5>
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
    this.filteredGoods = [];
  }

  fetchGoods() {
    makeGETRequest(`${API_URL}/${API_CATALOG}`)
        .then((goods) => {
          this.goods = JSON.parse(goods);
          this.filteredGoods = JSON.parse(goods);
        })
        .then(() => goodlist.render())
        .catch((err) => console.log(`Error: ${err}`))
    return new Promise((resolve, reject) => {
      if (Object.keys(this.goods).length !== 0 ) {
        resolve()
      } else {reject('The goods is empty')}
    })
  }

  render() {
    let listHtml = '';
    this.filteredGoods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }

  filterGoods(value) {
    const regexp = new RegExp(value, 'i');
    this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    this.render();
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
    let initialValue = 0
    let sum = this.goodsList.goods.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price, initialValue
    );
    return sum;
  }

  getCartItems() {
    makeGETRequest(`${API_URL}/${API_BASKET}`)
        .then((goods) => {
          console.log(`The basket consists of: ${goods}`);
        })
        .catch((err) => console.log(`Error: ${err}`))
  }
}

class CartElement {
  constructor(cartElement) {
    this.element = cartElement
  }
}


const goodlist = new GoodsList()

goodlist.fetchGoods()
    .then()
    .catch((err) => console.log(`Error ${err}`))

goodlist.fetchGoods()
    .then(() => goodlist.render())
    .catch((err) => console.log(`Error ${err}`))

const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.goods-search');


searchButton.addEventListener('click', (e) => {
  const value = searchInput.value;
  goodlist.filterGoods(value);
});


const cart = new CartGoods();
cart.addItemToCart(new GoodsItem('Shirt', 150))
cart.addItemToCart(new GoodsItem('Socks', 50))
cart.addItemToCart(new GoodsItem('Jacket', 350))
console.log(cart.getTotalSum())
cart.getCartItems()
