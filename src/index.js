// checkbox
function toggleCheckbox() {
  const checkbox = document.getElementById('discount-checkbox');
  
  checkbox.addEventListener('change', function() {
    this.nextElementSibling.classList.toggle('checked');
  });
}

// cart
function togglecart() {
  const btnCart = document.getElementById('cart');
  const btnCartClose = document.body.querySelector('.cart-close');
  const cart = document.body.querySelector('.cart');
  
  btnCart.addEventListener('click', function() {
    cart.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
  btnCartClose.addEventListener('click', function() {
    cart.style.display = 'none';
    document.body.style.overflow = '';
  });
}


// work with cart
function addCart() {
  const cards = document.body.querySelectorAll('.goods .card');
  const cartWrapper = document.body.querySelector('.cart-wrapper');
  const cartEmpty = document.getElementById('cart-empty');
  const countGoods = document.body.querySelector('.counter');
  
  cards.forEach((card) => {
    const btn = card.querySelector('.btn');
  
    btn.addEventListener('click', function() {
      const cardClone = card.cloneNode(true);
      const btnRemove = cardClone.querySelector('.btn');
  
      cartWrapper.appendChild(cardClone);
      cartEmpty.remove();
      showData();
  
      btnRemove.textContent = 'Удалить из корзины';
      btnRemove.addEventListener('click', function() {
        cardClone.remove();
        showData();
      });
    });
  });
  
  function showData() {
    const cardsCart = cartWrapper.querySelectorAll('.card');
    const cardsPrice = cartWrapper.querySelectorAll('.card-price');
    const cartTotal = document.body.querySelector('.cart-total span');
    let total = 0;
  
    countGoods.textContent = cardsCart.length;
    cardsPrice.forEach((cardPrice) => {
      total += parseFloat(cardPrice.textContent);
    });
    cartTotal.textContent = total;
    if (cardsCart.length !== 0) {
      cartEmpty.remove();
    } else {
      cartWrapper.appendChild(cartEmpty);
    }
  }
}

// filters
function filters() {
  const cards = document.body.querySelectorAll('.goods .card');
  const discountCheckbox = document.getElementById('discount-checkbox');
  const min = document.getElementById('min');
  const max = document.getElementById('max');

  discountCheckbox.addEventListener('click', function() {
    cards.forEach((card) => {
      if (discountCheckbox.checked) {
        if (!(card.querySelector('.card-sale'))) {
          card.parentElement.style.display = 'none';
        }
      } else {
        card.parentElement.style.display = '';
      }
    });
  });

  function filterPrice() {
    cards.forEach((card) => {
      const cardPrice = card.querySelector('.card-price');
      const price = parseFloat(cardPrice.textContent);
      const discount = card.querySelector('.card-sale');

      if((min.value && price < min.value) || (max.value && price > max.value)) {
        card.parentElement.style.display = 'none';
      } else if(discountCheckbox.checked && !discount) {
        card.parentElement.style.display = 'none';
      } else {
        card.parentElement.style.display = '';
      }
    });
  }

  min.addEventListener('change', filterPrice);
  max.addEventListener('change', filterPrice);

}

// search
function search() {
  const search = document.body.querySelector('.search-wrapper_input');
  const btnSearch = document.body.querySelector('.search-btn');

  btnSearch.addEventListener('click', function() {
    const cards = document.body.querySelectorAll('.goods .card');
    const searchText = new RegExp(search.value.trim(), 'i');
    
    cards.forEach((card) => {
      const title = card.querySelector('.card-title');

      if (!searchText.test(title.textContent)) {
        card.parentElement.style.display = 'none';
      } else {
        card.parentElement.style.display = '';
      }
    });


  });
}

// get data from the server
function getData() {
  return fetch('../db/db.json').then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Данные не получены, ошибка: ' + response.status);
    }
  })
  .then(res => res)
  .catch(error => console.warn(error));
}
getData()
  .then(data => {
    renderCards(data);
    toggleCheckbox();
    togglecart();
    addCart();
    filters();
    search();
    renderCatalog();
  });

function renderCards(data) {
  const goodsWrapper = document.body.querySelector('.goods');

  data.goods.forEach((good) => {
    const card = document.createElement('div');
    card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
    card.innerHTML = `
      <div class="card" data-category="${good.category}">
        ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
        <div class="card-img-wrapper">
          <span class="card-img-top"
            style="background-image: url('${good.img}')">
          </span>
        </div>
        <div class="card-body justify-content-between">
          <div class="card-price">${good.price} ₽</div>
          <h5 class="card-title">${good.title}</h5>
          <button class="btn btn-primary">В корзину</button>
        </div>
      </div>
    `;
    goodsWrapper.appendChild(card);
  });
}

function renderCatalog() {
  const cards = document.body.querySelectorAll('.goods .card');
  const categories = new Set();
  const catalogList = document.body.querySelector('.catalog-list');
  const btnCatalog = document.body.querySelector('.catalog-button');

  cards.forEach((card) => {
    categories.add(card.dataset.category);
  });

  categories.forEach((category) => {
    const li = document.createElement('li');
    li.textContent = category;
    catalogList.appendChild(li);
  });

  btnCatalog.addEventListener('click', function(event) {
    if (catalogList.parentElement.style.display) {
    catalogList.parentElement.style.display = '';
    } else {
      catalogList.parentElement.style.display = 'block';
    }

    if (event.target.tagName === 'LI') {
      cards.forEach((card) => {
        if (card.dataset.category === event.target.textContent) {
          card.parentElement.style.display = '';
        } else {
          card.parentElement.style.display = 'none';
        }
      });
    }
  });
}






