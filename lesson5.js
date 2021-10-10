
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
      this.isVisibleCart ? this.isVisibleCart = false : this.isVisibleCart = true
      this.getCartItems()
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
      const productToAdd =
        {
          "id_product" : addId,
          "quantity" : 1
        }
      this.makeGETRequest(`${this.API_URL}/${this.API_ADD_BASKET}`)
          .then((feedback) => {
            console.log(`The feedback from the server: ${feedback}`);
            console.log(addId)
          })
          .catch((err) => console.log(`Error: ${err}`))
    },
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

