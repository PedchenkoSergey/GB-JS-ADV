/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./components/goods_item.js":
/*!**********************************!*\
  !*** ./components/goods_item.js ***!
  \**********************************/
/***/ ((module) => {

eval("var goods_item = {\n  props: ['good'],\n  template: \"\\n    <div class=\\\"card\\\" style=\\\"width: 18rem;\\\">\\n      <img src=\\\"static/img/test.png\\\" class=\\\"card-img-top\\\" alt=\\\"...\\\">\\n      <div class=\\\"card-body\\\">\\n        <h5 class=\\\"card-title\\\">{{ good.product_name }}</h5>\\n        <p class=\\\"card-text\\\">Price: {{ good.price }}</p>\\n        <a v-on:click=\\\"getAddCartItem(good.id_product)\\\" class=\\\"btn btn-primary\\\">Add to cart</a>\\n      </div>\\n    </div>\",\n  methods: {\n    getAddCartItem: function getAddCartItem(id_prod) {\n      this.$emit('add-id-basket', id_prod);\n    }\n  }\n}; // export default {\n//   goods_item: goods_item\n// };\n\nmodule.exports = {\n  goods_item: goods_item\n};\n\n//# sourceURL=webpack://gb-js-adv/./components/goods_item.js?");

/***/ }),

/***/ "./components/goods_list.js":
/*!**********************************!*\
  !*** ./components/goods_list.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var _require = __webpack_require__(/*! ./goods_item */ \"./components/goods_item.js\"),\n    goods_item = _require.goods_item;\n\nvar goods_list = {\n  components: {\n    'goods_item': goods_item\n  },\n  props: ['goods'],\n  template: \"\\n  <div class=\\\"goods-list wrapper\\\">\\n    <goods_item v-for=\\\"good in goods\\\" :good=\\\"good\\\" @add-id-basket=\\\"postAddCartItemInner\\\"></goods_item>\\n  </div>\\n  \",\n  methods: {\n    postAddCartItemInner: function postAddCartItemInner(id) {\n      this.$emit('add-id-basket-inner', id);\n    }\n  }\n}; // export default {\n//   goods_list: goods_list\n// };\n\nmodule.exports = {\n  goods_list: goods_list\n};\n\n//# sourceURL=webpack://gb-js-adv/./components/goods_list.js?");

/***/ }),

/***/ "./components/script.js":
/*!******************************!*\
  !*** ./components/script.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar _require = __webpack_require__(/*! ./goods_list.js */ \"./components/goods_list.js\"),\n    goods_list = _require.goods_list;\n\nvar _require2 = __webpack_require__(/*! ./vue_goods_search.js */ \"./components/vue_goods_search.js\"),\n    vue_goods_search = _require2.vue_goods_search;\n\nvar _require3 = __webpack_require__(/*! ./vue_goods_cart.js */ \"./components/vue_goods_cart.js\"),\n    vue_goods_cart = _require3.vue_goods_cart;\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  components: {\n    goods_list: goods_list,\n    vue_goods_search: vue_goods_search,\n    vue_goods_cart: vue_goods_cart\n  }\n});\nvar vue_server_error = {\n  props: ['server_ok'],\n  template: \"\\n    <p v-if=\\\"!server_ok\\\">\\u041F\\u0440\\u043E\\u043F\\u0430\\u043B\\u0430 \\u0441\\u0432\\u044F\\u0437\\u044C \\u0441 \\u0441\\u0435\\u0440\\u0432\\u0435\\u0440\\u043E\\u043C! \\u041D\\u0435\\u0431\\u0445\\u043E\\u0434\\u0438\\u043C\\u043E \\u043F\\u0440\\u0438\\u043D\\u044F\\u0442\\u044C \\u043C\\u0435\\u0440\\u044B!</p>\\n  \"\n};\nvar app = new Vue({\n  components: {\n    'goods_list': goods_list,\n    'vue_goods_search': vue_goods_search,\n    'vue_goods_cart': vue_goods_cart,\n    'vue_server_error': vue_server_error\n  },\n  el: '#app',\n  data: {\n    goods: [],\n    filteredGoods: [],\n    isVisibleCart: false,\n    cartGoodsList: [],\n    cartSum: 0,\n    id_prod: 0,\n    serverOK: false,\n    API_URL: 'http://localhost:3000',\n    API_CATALOG: 'catalogData',\n    //– получить список товаров;\n    API_BASKET: 'getBasket',\n    //– получить содержимое корзины;\n    API_ADD_BASKET: 'addToCart',\n    // – добавить товар в корзину;\n    API_DELETE_BASKET: 'deleteFromBasket' //– удалить товар из корзины.\n\n  },\n  methods: {\n    makeGETRequest: function makeGETRequest(url) {\n      return new Promise(function (resolve, reject) {\n        var xhr;\n\n        if (window.XMLHttpRequest) {\n          xhr = new XMLHttpRequest();\n        } else if (window.ActiveXObject) {\n          xhr = new ActiveXObject(\"Microsoft.XMLHTTP\");\n        }\n\n        xhr.onreadystatechange = function () {\n          if (xhr.readyState === 4) {\n            if (xhr.status === 200) {\n              resolve(xhr.responseText);\n            } else {\n              reject(\"Status is not 200: \".concat(xhr.status));\n            }\n          }\n        };\n\n        xhr.open('GET', url, true);\n        xhr.send();\n      });\n    },\n    makePOSTRequest: function makePOSTRequest(url, data) {\n      return new Promise(function (resolve, reject) {\n        var xhr;\n\n        if (window.XMLHttpRequest) {\n          xhr = new XMLHttpRequest();\n        } else if (window.ActiveXObject) {\n          xhr = new ActiveXObject(\"Microsoft.XMLHTTP\");\n        }\n\n        xhr.onreadystatechange = function () {\n          if (xhr.readyState === 4) {\n            if (xhr.status === 200) {\n              resolve(xhr.responseText);\n            } else {\n              reject(\"Status is not 200: \".concat(xhr.status));\n            }\n          }\n        };\n\n        xhr.open('POST', url, true);\n        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');\n        xhr.send(data);\n      });\n    },\n    filterGoods: function filterGoods(search_line) {\n      var regexp = new RegExp(search_line, 'i');\n      this.filteredGoods = this.goods.filter(function (good) {\n        return regexp.test(good.product_name);\n      });\n    },\n    viewBasket: function viewBasket() {\n      this.isVisibleCart = !this.isVisibleCart;\n      this.getCartItems();\n    },\n    getCartItems: function getCartItems() {\n      var _this = this;\n\n      this.makeGETRequest(\"\".concat(this.API_URL, \"/\").concat(this.API_BASKET)).then(function (goods) {\n        console.log(\"The basket consists of: \".concat(goods));\n        _this.cartGoodsList = JSON.parse(goods);\n      })[\"catch\"](function (err) {\n        console.log(\"Error: \".concat(err));\n        _this.serverOK = false;\n      });\n    },\n    postAddCartItem: function postAddCartItem(addId) {\n      var _this2 = this;\n\n      var product_add = {};\n\n      for (var i = 0; i < this.goods.length; i++) {\n        if (this.goods[i].id_product === addId) {\n          product_add = this.goods[i];\n        }\n      }\n\n      console.log(JSON.stringify(product_add));\n      this.makePOSTRequest(\"\".concat(this.API_URL, \"/\").concat(this.API_ADD_BASKET), JSON.stringify(product_add)).then(function (res) {\n        return console.log(res);\n      }).then(function () {\n        return _this2.getCartItems();\n      })[\"catch\"](function (err) {\n        return console.log(err);\n      });\n    },\n    deleteBasketElement: function deleteBasketElement(deleteId) {\n      var _this3 = this;\n\n      var product_delete = {};\n\n      for (var i = 0; i < this.goods.length; i++) {\n        if (this.goods[i].id_product === deleteId) {\n          product_delete = this.goods[i];\n        }\n      }\n\n      console.log(JSON.stringify(product_delete));\n      this.makePOSTRequest(\"\".concat(this.API_URL, \"/\").concat(this.API_DELETE_BASKET), JSON.stringify(product_delete)).then(function (res) {\n        return console.log(res);\n      }).then(function () {\n        return _this3.getCartItems();\n      })[\"catch\"](function (err) {\n        return console.log(err);\n      });\n    }\n  },\n  mounted: function mounted() {\n    var _this4 = this;\n\n    this.makeGETRequest(\"\".concat(this.API_URL, \"/\").concat(this.API_CATALOG)).then(function (goods) {\n      _this4.goods = JSON.parse(goods);\n      _this4.filteredGoods = JSON.parse(goods);\n      _this4.serverOK = true;\n    })[\"catch\"](function (err) {\n      console.log(\"Error: \".concat(err));\n      _this4.serverOK = false;\n    });\n  }\n});\n\n//# sourceURL=webpack://gb-js-adv/./components/script.js?");

/***/ }),

/***/ "./components/vue_goods_cart.js":
/*!**************************************!*\
  !*** ./components/vue_goods_cart.js ***!
  \**************************************/
/***/ ((module) => {

eval("var vue_goods_cart = {\n  props: ['cart_goods_list'],\n  template: \"\\n  <div class=\\\"cart-element\\\">\\n    <table>\\n        <thead style=\\\"background: #fc0\\\">\\n        <tr><th>\\u041D\\u0430\\u0437\\u0432\\u0430\\u043D\\u0438\\u0435</th><th>\\u0426\\u0435\\u043D\\u0430</th><th>\\u041A\\u043E\\u043B\\u0438\\u0447\\u0435\\u0441\\u0442\\u0432\\u043E</th><th>\\u0423\\u0434\\u0430\\u043B\\u0438\\u0442\\u044C</th></tr> <!--\\u0440\\u044F\\u0434 \\u0441 \\u044F\\u0447\\u0435\\u0439\\u043A\\u0430\\u043C\\u0438 \\u0437\\u0430\\u0433\\u043E\\u043B\\u043E\\u0432\\u043A\\u043E\\u0432-->\\n        </thead>\\n        <tfoot style=\\\"background: palegreen\\\">\\n        <tr>\\n            <td>\\u0418\\u0442\\u043E\\u0433\\u043E \\u0432 \\u043A\\u043E\\u0440\\u0437\\u0438\\u043D\\u0435 \\u043D\\u0430 \\u0441\\u0443\\u043C\\u043C\\u0443:</td>\\n            <td>{{cart_goods_list.amount}}</td>\\n        </tr>\\n        </tfoot>\\n        <tbody style=\\\"background: #ccc\\\">\\n        <tr v-for=\\\"product in cart_goods_list.contents\\\">\\n          <td>{{product.product_name}}</td>\\n          <td>{{product.price}}</td>\\n          <td>{{product.quantity}}</td>\\n          <td><a class=\\\"btn btn-danger\\\" v-on:click=\\\"deleteElement(product.id_product)\\\">\\u0423\\u0434\\u0430\\u043B\\u0438\\u0442\\u044C</a></td>\\n        </tr>\\n        </tbody>\\n    </table>\\n  </div>\\n  \",\n  methods: {\n    deleteElement: function deleteElement(deleteId) {\n      this.$emit('basket-delete', deleteId);\n    }\n  }\n}; // export default {\n//   vue_goods_cart: vue_goods_cart\n// };\n\nmodule.exports = {\n  vue_goods_cart: vue_goods_cart\n};\n\n//# sourceURL=webpack://gb-js-adv/./components/vue_goods_cart.js?");

/***/ }),

/***/ "./components/vue_goods_search.js":
/*!****************************************!*\
  !*** ./components/vue_goods_search.js ***!
  \****************************************/
/***/ ((module) => {

eval("var vue_goods_search = {\n  props: ['search_line_comp'],\n  template: \"\\n  <div class=\\\"search-line\\\">\\n    <form class=\\\"col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3\\\">\\n      <input type=\\\"text\\\" v-model=\\\"search_line_comp\\\" class=\\\"goods-search form-control\\\" placeholder=\\\"\\u041F\\u043E\\u0438\\u0441\\u043A...\\\" aria-label=\\\"Search\\\">\\n    </form>\\n    <button class=\\\"search-button btn btn-primary\\\" type=\\\"button\\\" v-on:click=\\\"filter\\\">\\u0418\\u0441\\u043A\\u0430\\u0442\\u044C</button>\\n  </div>\",\n  methods: {\n    filter: function filter() {\n      this.$emit('filter-comp', this.search_line_comp);\n    }\n  }\n}; // export default {\n//   vue_goods_search: vue_goods_search\n// };\n\nmodule.exports = {\n  vue_goods_search: vue_goods_search\n};\n\n//# sourceURL=webpack://gb-js-adv/./components/vue_goods_search.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./components/script.js");
/******/ 	
/******/ })()
;