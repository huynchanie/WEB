// Lấy dữ liệu từ localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    const cartList = document.getElementById('cart-list');
    const totalPrice = document.getElementById('total-price');
    cartList.innerHTML = ''; // Làm trống giỏ hàng

    if (cart.length === 0) {
        cartList.innerHTML = `<p class="empty">Giỏ hàng của bạn đang trống.</p>`;
        totalPrice.textContent = 'Tổng cộng: 0₫';
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="info">
                <h4>${item.name}</h4>
                <p>${item.price.toLocaleString()}₫ x ${item.quantity}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Xóa</button>
        `;
        cartList.appendChild(cartItem);

        total += item.price * item.quantity;
    });

    totalPrice.textContent = `Tổng cộng: ${total.toLocaleString()}₫`;
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Lắng nghe sự kiện cho các nút "Tiếp tục mua sắm" và "Thanh toán"
document.querySelector('.continue-btn').addEventListener('click', () => {
    window.location.href = '/homepage/index.html';  // Trở về trang chủ
});

document.querySelector('.checkout-btn').addEventListener('click', () => {
    alert('Chức năng thanh toán chưa được tích hợp.');
});

// Khi trang tải, render giỏ hàng
document.addEventListener('DOMContentLoaded', renderCart);
