const goods_item =  {
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
};

// export default {
//   goods_item: goods_item
// };

module.exports = {
  goods_item: goods_item
}
