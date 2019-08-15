// checkbox
function toggleCheckbox() {
  const checkbox = document.getElementById('discount-checkbox');
  
  checkbox.addEventListener('change', function() {
    this.nextElementSibling.classList.toggle('checked');
  });
}
toggleCheckbox();

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
togglecart();


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
addCart();

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

      if((min.value && price < min.value) || (max.value && price > max.value)) {
        card.parentElement.style.display = 'none';
      } else {
        card.parentElement.style.display = '';
      }
    });
  }

  min.addEventListener('change', filterPrice);
  max.addEventListener('change', filterPrice);

}
filters();

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
search();







