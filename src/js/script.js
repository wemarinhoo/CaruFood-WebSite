const tabs = document.querySelectorAll('.tabs');

tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)));

tabClicked(tabs[0]);

function tabClicked(tab){
 tabs.forEach(tab => tab.classList.remove('active'))
 tab.classList.add('active')
 const contents = document.querySelectorAll('.card-item');

 contents.forEach(content => content.classList.remove('show'));

 const cardId = tab.getAttribute('content-id');

 const cards = document.querySelectorAll(`[data-content-id="${cardId}"]`);

 cards.forEach(card => card.classList.add('show'));
}

const btnOpenCart = document.querySelector('.cart')
const modal = document.querySelector('.modal-cart')
const body = document.querySelector('body')
const btnCloseCart = document.querySelector('.button-close-modal')

btnOpenCart.addEventListener('click', () => {
  modal.classList.toggle('view')
  body.classList.toggle('no-scroll')
})

btnCloseCart.addEventListener('click', () => {
  modal.classList.toggle('view')
  body.classList.toggle('no-scroll')
})