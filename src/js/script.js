const tabs = document.querySelectorAll('.tabs');
const btnOpenCart = document.querySelector('.cart')
const btnCloseCart = document.querySelector('.button-close-modal')
const btnFilter = document.querySelector('.filter-button')
const menuFilter = document.querySelector('.menu-filter')
const optionsFilter = document.querySelectorAll('.options-filter')
const modal = document.querySelector('.modal-cart')
const body = document.querySelector('body')
const cartCounter = document.querySelector('.cart-counter')
const btnAddCart = document.querySelector('.add-cart')
const totalPurchase = document.querySelector('.purchase-total')
const cartItems = document.querySelector('.items-cart')
const menuItems = document.querySelector('.menu')
const btnClearCart = document.querySelector('.button-clear-cart')
const inputTicket = document.querySelector('.input-field-ticket')
const btnActiveDiscount = document.querySelector('.btn-active-ticket')

let cart = []
let totalPrice = 0

tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)))

tabClicked(tabs[0])

function tabClicked(tab){
 tabs.forEach(tab => tab.classList.remove('active'))
 tab.classList.add('active')
 const contents = document.querySelectorAll('.card-item')

 contents.forEach(content => content.classList.remove('show'))

 const cardId = tab.getAttribute('content-id')

 const cards = document.querySelectorAll(`[data-content-id="${cardId}"]`)

 cards.forEach(card => card.classList.add('show'))
}

btnOpenCart.addEventListener('click', () => {
  updateCart()
  modal.classList.toggle('view')
  body.classList.toggle('no-scroll')
})

modal.addEventListener('click', (e) => {
  const target = e.target.className.includes('modal-cart')
  
  if(target){
    modal.classList.toggle('view')
    body.classList.toggle('no-scroll')
  }
})

btnCloseCart.addEventListener('click', () => {
  modal.classList.toggle('view')
  body.classList.toggle('no-scroll')

  inputTicket.value = ""
})

btnFilter.addEventListener('click', () => {
  menuFilter.classList.toggle('view')
})

optionsFilter.forEach(option => option.addEventListener('click', () => menuFilter.classList.toggle('view')))

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
 let totalQuantity = 0

 cart.forEach(item => {
    const cartItemElement = document.createElement('div')
    cartItemElement.classList.add('items-cart')

    cartItemElement.innerHTML = `
      <div class="item">
        <div class="info-item">
          <h6>${item.name}</h6>
          <span>Quantidade: ${item.quantity}</span>
          <span id="price-item">R$${(item.price * item.quantity)}</span>
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

 totalPrice = total
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

btnClearCart.addEventListener('click', () => {
  cart = []
  updateCart()
})

function appDiscount(){
  inputTicket.addEventListener('input', (e) => {
    const valueInput = e.target.value
    const ticket = "CF10"

    if(valueInput === ticket && totalPrice > 0){
      const discount = totalPrice * 0.10
      const valueDiscount = totalPrice - discount
      totalPurchase.textContent = valueDiscount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }) + "(-10%)"
    } else {
      valueDiscount = totalPrice
      totalPurchase.textContent = valueDiscount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    }
  })
}

btnActiveDiscount.addEventListener('click', appDiscount())

let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.querySelector(".adress"), {
    center: { lat: -8.0476, lng: -34.8770 },
    zoom: 6,
    mapTypeControl: false,
    streetViewControl: false
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Obter localização atual";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

window.initMap = initMap

document.addEventListener('DOMContentLoaded', () => {
  Toastify({
    text: '🎉 10% de desconto em sua primeira compra! Use o código "CF10". Aproveite',
    duration: 5000,
    close: true,
    className: 'toast',
    gravity: "top",
    position: "left",
    stopOnFocus: true,
    style: {
      background: "#181818",
    },
  }).showToast()
})