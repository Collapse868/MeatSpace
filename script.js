function Openn() {
    const modal = document.getElementById('loginDropdown');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}
function proverka(event) {
    event.preventDefault();
    alert('Вход выполнен!');
    close();
}
 function close() {
    const dropdown = document.getElementById('loginDropdown');
    dropdown.classList.remove('visible');
    setTimeout(() => {
        dropdown.style.display = 'none';
    }, 300);
}
function Basket() {
    const modall = document.getElementById('basketModal');
    if (modall.style.display === 'block') {
        modall.style.display = 'none';
    } else {
        modall.style.display = 'block';
        document.documentElement.style.overflow = 'auto';
    }
}
function closebasket() {
    const dropdown = document.getElementById('basketModal');
    dropdown.classList.remove('visible');
    setTimeout(() => {
        dropdown.style.display = 'none';
    }, 300);
}
function Category(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth', 
      block: 'start'    
    });
  } else {
    console.error(`Элемент с ID "${id}" не найден.`);
  }
}
 function Openn() {
    document.querySelector("#loginDropdown").style.display = 'block';
    document.querySelector(".header").style.filter = 'blur(10px)';
    document.querySelector(".main-container").style.filter = 'blur(10px)';
}
function closeform() {
    document.querySelector("#loginDropdown").style.display = 'none';
    document.querySelector(".header").style.filter = 'none';
    document.querySelector(".main-container").style.filter = 'none';
}
function reg() {
    document.querySelector("#loginDropdown").style.display = 'none';
    document.querySelector(".header").style.filter = 'none';
    document.querySelector(".main-container").style.filter = 'none';
}
let basket = [];
function addToBasket(name, price, image) {
    const existingItemIndex = basket.findIndex(item => item.name === name);
    
    if (existingItemIndex !== -1) {
        basket[existingItemIndex].quantity ++;
    } else {
        const newItem = {
            name: name,
            price: price,
            image: image,
            quantity: 1
        };
        basket.push(newItem);
    }
    
    updateBasketCount();
    if (document.getElementById('basketModal').style.display === 'block') {
        renderBasketItems();
    }
}
function updateBasketCount() {
    const totalItems = basket.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('BasketCount').textContent = totalItems;
}
function increaseQuantity(index) {
    if (index >= 0 && index < basket.length) {
        basket[index].quantity += 1;
        updateBasketCount();
        renderBasketItems();
    }
}
function decreaseQuantity(index) {
    if (index >= 0 && index < basket.length) {
        if (basket[index].quantity > 1) {
            basket[index].quantity -= 1;
        } else {
            if (confirm) {
                removeFromBasket(index);
                return;
            }
        }
        updateBasketCount();
        renderBasketItems();
    }
}
function removeFromBasket(index) {
    basket.splice(index, 1);
    updateBasketCount();
    renderBasketItems();
}

function renderBasketItems() {
    const basketItemsContainer = document.getElementById('basketItems');
    const basketTotalPriceElement = document.getElementById('basketTotalPrice');
    
    basketItemsContainer.innerHTML = '';
    
    let total = 0;
    
    basket.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'basket-item';
        itemElement.innerHTML = `
            <div class="basket-item-left">
                <img src="${item.image}" alt="${item.name}" class="basket-item-img">
                <div class="basket-item-info">
                    <h4>${item.name}</h4>
                    <p class="basket-item-price">${item.price} ₽</p>
                </div>
            </div>
            <div class="basket-item-right">
                <div class="quantity-controls">
                    <button class="quantity-btn minus" onclick="decreaseQuantity(${index})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="increaseQuantity(${index})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <button class="remove-btn" onclick="removeFromBasket(${index})" title="Удалить">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        basketItemsContainer.appendChild(itemElement);
    });
    basketTotalPriceElement.textContent = `${total} ₽`;
}
function Basket() {
    const modal = document.getElementById('basketModal');
    modal.style.display = 'block';
    renderBasketItems(); 
}

function closebasket() {
    document.getElementById('basketModal').style.display = 'none';
}

function zakaz() {
    if (basket.length === 0) {
        alert('Корзина пуста!');
        return;
    }

    let total = 0;
    let totalItems = 0;
    basket.forEach(item => {
        total += item.price * item.quantity;
        totalItems += item.quantity;
    });
    alert(`Заказ оформлен! Сумма: ${total} ₽\nТоваров: ${totalItems} шт.`);
    
    basket = [];
    updateBasketCount();
    renderBasketItems();
    closebasket();
}
