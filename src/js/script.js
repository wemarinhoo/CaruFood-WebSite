const tabs = document.querySelectorAll('.tabs');
const btnOpenCart = document.querySelector('.cart')
const btnCloseCart = document.querySelector('.button-close-modal')
const btnFilter = document.querySelector('.filter-button')
const menuFilter = document.querySelector('.menu-filter')
const modal = document.querySelector('.modal-cart')
const body = document.querySelector('body')
const cartCounter = document.querySelector('.cart-counter')
const btnAddCart = document.querySelector('.add-cart')
const totalPurchase = document.querySelector('.purchase-total')
const cartItems = document.querySelector('.items-cart')
const menuItems = document.querySelector('.menu')

let cart = []

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

btnOpenCart.addEventListener('click', () => {
  updateCart()
  modal.classList.toggle('view')
  body.classList.toggle('no-scroll')
})

btnCloseCart.addEventListener('click', () => {
  modal.classList.toggle('view')
  body.classList.toggle('no-scroll')
})

btnFilter.addEventListener('click', () => {
  menuFilter.classList.toggle('view')
})

menuItems.addEventListener('click', (e) => {
  let parentBtn = e.target.closest('.add-cart')

  if(parentBtn){
    const name = parentBtn.getAttribute('data-name')
    const price = parseFloat(parentBtn.getAttribute('data-price'))
    addToCart(name, price)
  }

  
})

function addToCart(name, price){
  const hasItem = cart.find(item => item.name === name)

  if(hasItem){
    hasItem.quantity += 1;
  } else{
    cart.push({
      name,
      price,
      quantity: 1,
    })
  }

  updateCart()
}

function updateCart(){
 cartItems.innerHTML = ""
 let total = 0
 let totalQuantity = ""

 cart.forEach(item => {
    const cartItemElement = document.createElement('div')
    cartItemElement.classList.add('items-cart')

    cartItemElement.innerHTML = `
      <div class="item">
        <div class="info-item">
          <h6>${item.name}</h6>
          <span>Quantidade: ${item.quantity}</span>
          <span id="price-item">R$${(item.price * item.quantity).toFixed(2)}</span>
        </div>

        <div class="remove">
          <button class="remove" data-name="${item.name}">Remover</button>
        </div>
      </div>
    `

    total += item.price * item.quantity
    totalQuantity += item.quantity

    cartItems.appendChild(cartItemElement)
 });

      if(totalQuantity > 0){
        cartCounter.innerHTML = totalQuantity
        cartCounter.style.display = "flex"
 }   else{
        cartCounter.style.display = "none"
 }

 totalPurchase.textContent = total.toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL'
 })
}

cartItems.addEventListener('click', (e) => {
  if(e.target.classList.contains('remove')){
    const name = e.target.getAttribute('data-name')
    
    removeItemCart(name)
  }
})

function removeItemCart(name){
  const index = cart.findIndex(item => item.name === name)

  if(index !== -1){
    const item = cart[index]

    if(item.quantity > 1){
    item.quantity -= 1
    updateCart()
    return
  }
}
  cart.splice(index, 1)
  updateCart()
}