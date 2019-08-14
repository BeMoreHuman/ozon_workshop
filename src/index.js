// checkbox
const checkbox = document.getElementById('discount-checkbox');

checkbox.addEventListener('change', function() {
  this.nextElementSibling.classList.toggle('checked');
});

// cart
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

// work with cart
const cards = document.body.querySelectorAll('.goods .card');
const cartWrapper = document.body.querySelector('.cart-wrapper');
const cartEmpty = document.getElementById('cart-empty');
const countGoods = document.body.querySelector('.counter');

cards.forEach((card) => {
  const btn = card.querySelector('.btn');

  btn.addEventListener('click', function() {
    const cardClone = card.cloneNode(true);

    cartWrapper.appendChild(cardClone);
    cartEmpty.remove();
    showData();
  });
});

function showData() {
  const cardsCart = cartWrapper.querySelectorAll('.card');
  countGoods.textContent = cardsCart.length;
}
