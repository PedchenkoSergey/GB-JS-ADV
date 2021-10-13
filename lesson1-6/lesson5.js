
const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: '',
    isVisibleCart: false,
    cartGoodsList: [],
    cartSum: 0,
    id_prod: 0,
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
    },
    filterGoods() {
      const regexp = new RegExp(this.searchLine, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    },
    viewBasket() {
      this.isVisibleCart = !this.isVisibleCart
      // this.getCartItems()
    },
    getCartItems() {
      this.makeGETRequest(`${this.API_URL}/${this.API_BASKET}`)
          .then((goods) => {
            console.log(`The basket consists of: ${goods}`);
            this.cartGoodsList = JSON.parse(goods);
          })
          .catch((err) => console.log(`Error: ${err}`))
    },
    getAddCartItem(addId) {
      console.log(`In the basket is the following items: ${JSON.stringify(this.cartGoodsList)}`)
      for (let i = 0; i < this.goods.length; i++) {
        if (this.goods[i].id_product === addId) {
          console.log(`${this.goods[i].product_name}`);
          this.cartGoodsList.amount += this.goods[i].price
          this.cartGoodsList.countGoods += 1
          let inBasket = false; // Check the item is already in basket
          for (let j = 0; j < this.cartGoodsList.contents.length; j++) {
            if (this.cartGoodsList.contents[j].id_product === addId) {
              this.cartGoodsList.contents[j].quantity += 1;
              inBasket = true
            }
          }
          if (!inBasket){
              this.goods[i]['quantity'] = 1
              this.cartGoodsList.contents.push(this.goods[i])
            }
        }
      }
// {
//   "amount": 46600,
//   "countGoods": 2,
//   "contents": [
//     {
//       "id_product": 123,
//       "product_name": "Ноутбук",
//       "price": 45600,
//       "quantity": 1
//     },
//     {
//       "id_product": 456,
//       "product_name": "Мышка",
//       "price": 1000,
//       "quantity": 1
//     }
//   ]
// }
// {"id_product":123,"product_name":"Ноутбук","price":45600}
    //   const productToAdd =
    //     {
    //       "id_product" : addId,
    //       "quantity" : 1
    //     }
    //

    },
  },

  mounted() {
    this.makeGETRequest(`${this.API_URL}/${this.API_CATALOG}`)
        .then((goods) => {
          this.goods = JSON.parse(goods);
          this.filteredGoods = JSON.parse(goods);
        })
        .catch((err) => console.log(`Error: ${err}`));
    this.getCartItems();
  }

});

