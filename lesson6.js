
Vue.component('goods-list', {
  props: ['goods'],
  template: `
  <div class="goods-list wrapper">
    <goods-item v-for="good in goods" :good="good"></goods-item>
  </div>
  `
});

Vue.component('goods-item', {
  props: ['good'],
  template: `
    <div class="card" style="width: 18rem;">
      <img src="static/img/test.png" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{ good.product_name }}</h5>
        <p class="card-text">Price: {{ good.price }}</p>
        <a v-on:click="getAddCartItem(good.id_product)" class="btn btn-primary">Add to cart</a>
      </div>
    </div>`
});

Vue.component('vue-goods-search', {
  props: ['search_line_comp'],
  template:`
  <div class="search-line">
    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
      <input type="text" v-model="search_line_comp" class="goods-search form-control" placeholder="Поиск..." aria-label="Search">
    </form>
    <button class="search-button btn btn-primary" type="button" v-on:click="filter">Искать</button>
  </div>`,
  methods: {
    filter() {
      this.$emit('filter-comp', this.search_line_comp)
    }
  }
});

Vue.component('vue-goods-cart', {
  props: ['cart_goods_list'],
  template: `
  <div class="cart-element">
    <table>
      <tr><th>Название</th><th>Цена</th><th>Количество</th></tr> <!--ряд с ячейками заголовков-->
      <tr v-for="product in cart_goods_list.contents">
        <td>{{product.product_name}}</td>
        <td>{{product.price}}</td>
        <td>{{product.quantity}}</td>
      </tr>
    </table>
    <table>
      <tr>
        <td>Итого в корзине на сумму:</td>
        <td>{{cart_goods_list.amount}}</td>
      </tr>
    </table>
  </div>
  `
});

Vue.component('vue-server-error', {
  props: ['server_ok'],
  template:`
    <p v-if="!server_ok">Пропала связь с сервером! Небходимо принять меры!</p>
  `
})

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    isVisibleCart: false,
    cartGoodsList: [],
    cartSum: 0,
    id_prod: 0,
    serverOK: false,
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
    filterGoods(search_line) {
      const regexp = new RegExp(search_line, 'i');
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
          .catch((err) => {
            console.log(`Error: ${err}`);
            this.serverOK = false;
          })
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
            this.serverOK = true;
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
            this.serverOK = false;
          })
    },
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

