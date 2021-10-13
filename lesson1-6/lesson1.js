// Материал первого урока:
const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title='Null', price='None') => {
  // return `<div class="goods-item g-col-6"><h3>${title}</h3><p>${price}</p></div>`;
  return `<div class="card" style="width: 18rem;">
            <img src="static/img/test.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">Price: ${price}</p>
              <a href="#" class="btn btn-primary">Add to cart</a>
            </div>
          </div>
          `;
};

const renderGoodsList = (list) => {
  let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
  document.querySelector('.goods-list').innerHTML = goodsList.join("");
}

renderGoodsList(goods);


