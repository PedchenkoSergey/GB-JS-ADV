
Vue.component('goods-list', {
  props: ['goods'],
  template: `
  <div class="goods-list wrapper">
    <goods-item v-for="good in goods" :good="good" @add-id-basket="postAddCartItemInner"></goods-item>
  </div>
  `,
  methods: {
    postAddCartItemInner(id) {
      this.$emit('add-id-basket-inner', id)
    }
  }
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
    </div>`,
  methods: {
    getAddCartItem(id_prod) {
      this.$emit('add-id-basket', id_prod)
    }
  }
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
        <thead style="background: #fc0">
        <tr><th>Название</th><th>Цена</th><th>Количество</th><th>Удалить</th></tr> <!--ряд с ячейками заголовков-->
        </thead>
        <tfoot style="background: palegreen">
        <tr>
            <td>Итого в корзине на сумму:</td>
            <td>{{cart_goods_list.amount}}</td>
        </tr>
        </tfoot>
        <tbody style="background: #ccc">
        <tr v-for="product in cart_goods_list.contents">
          <td>{{product.product_name}}</td>
          <td>{{product.price}}</td>
          <td>{{product.quantity}}</td>
          <td><a class="btn btn-danger" v-on:click="deleteElement(product.id_product)">Удалить</a></td>
        </tr>
        </tbody>
    </table>
  </div>
  `,
  methods: {
    deleteElement(deleteId) {
      this.$emit('basket-delete', deleteId)
    }
  }
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

