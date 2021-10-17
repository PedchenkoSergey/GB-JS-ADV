const {goods_list} = require('./goods_list.js')
const {vue_goods_search} = require('./vue_goods_search.js')
const {vue_goods_cart} = require('./vue_goods_cart.js')

export default {
  components: {
    goods_list,
    vue_goods_search,
    vue_goods_cart
  },
}


const vue_server_error = {
  props: ['server_ok'],
  template:`
    <p v-if="!server_ok">Пропала связь с сервером! Небходимо принять меры!</p>
  `
}


const app = new Vue({
  components: {
    'goods_list': goods_list,
    'vue_goods_search': vue_goods_search,
    'vue_goods_cart': vue_goods_cart,
    'vue_server_error': vue_server_error,
  },
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    isVisibleCart: false,
    cartGoodsList: [],
    cartSum: 0,
    id_prod: 0,
    serverOK: false,
    API_URL: 'http://localhost:3000',
    API_CATALOG: 'catalogData', //– получить список товаров;
    API_BASKET: 'getBasket', //– получить содержимое корзины;
    API_ADD_BASKET: 'addToCart', // – добавить товар в корзину;
    API_DELETE_BASKET: 'deleteFromBasket' //– удалить товар из корзины.
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


    makePOSTRequest(url, data) {
      return new Promise((resolve, reject) => {
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
            } else {
              reject(`Status is not 200: ${xhr.status}`)
            }
          }
        }

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.send(data);
      });
    },


    filterGoods(search_line) {
      const regexp = new RegExp(search_line, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    },


    viewBasket() {
      this.isVisibleCart = !this.isVisibleCart
      this.getCartItems()
    },


    getCartItems() {
      this.makeGETRequest(`${this.API_URL}/${this.API_BASKET}`)
          .then((goods) => {
            console.log(`The basket consists of: ${goods}`);
            this.cartGoodsList = JSON.parse(goods);
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
            this.serverOK = false;
          })
    },


    postAddCartItem(addId) {
      let product_add = {}
      for (let i = 0; i < this.goods.length; i++) {
        if (this.goods[i].id_product === addId) {
          product_add = this.goods[i]
        }
      }
      console.log(JSON.stringify(product_add))
      this.makePOSTRequest(`${this.API_URL}/${this.API_ADD_BASKET}`, JSON.stringify(product_add))
          .then((res) => console.log(res))
          .then(() => this.getCartItems())
          .catch((err) => console.log(err))
    },

    deleteBasketElement(deleteId) {
      let product_delete = {}
      for (let i = 0; i < this.goods.length; i++) {
        if (this.goods[i].id_product === deleteId) {
          product_delete = this.goods[i]
        }
      }
      console.log(JSON.stringify(product_delete))
      this.makePOSTRequest(`${this.API_URL}/${this.API_DELETE_BASKET}`, JSON.stringify(product_delete))
          .then((res) => console.log(res))
          .then(() => this.getCartItems())
          .catch((err) => console.log(err))
    }
  },

  mounted() {
    this.makeGETRequest(`${this.API_URL}/${this.API_CATALOG}`)
        .then((goods) => {
          this.goods = JSON.parse(goods);
          this.filteredGoods = JSON.parse(goods);
          this.serverOK = true;
        })
        .catch((err) => {
          console.log(`Error: ${err}`)
          this.serverOK = false;
        })
  }

});

