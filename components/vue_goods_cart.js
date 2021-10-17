const vue_goods_cart = {
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
};

// export default {
//   vue_goods_cart: vue_goods_cart
// };

module.exports = {
  vue_goods_cart: vue_goods_cart
}