const {goods_item} = require('./goods_item')

const goods_list = {
  components: {
    'goods_item': goods_item
  },
  props: ['goods'],
  template: `
  <div class="goods-list wrapper">
    <goods_item v-for="good in goods" :good="good" @add-id-basket="postAddCartItemInner"></goods_item>
  </div>
  `,
  methods: {
    postAddCartItemInner(id) {
      this.$emit('add-id-basket-inner', id)
    }
  }
};

// export default {
//   goods_list: goods_list
// };

module.exports = {
  goods_list: goods_list
}
