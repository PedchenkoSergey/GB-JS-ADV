const vue_goods_search = {
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
};

// export default {
//   vue_goods_search: vue_goods_search
// };

module.exports = {
  vue_goods_search: vue_goods_search
}