// Lấy các phần tử cần thiết
const profileIcon = document.getElementById('profile-icon');
const dropdownMenu = document.getElementById('dropdown-menu');

 // Lấy giỏ hàng từ localStorage nếu có
 let cart = JSON.parse(localStorage.getItem('cart')) || [];

 // Hàm thêm sản phẩm vào giỏ hàng
 function addToCart(product) {
     // Kiểm tra xem sản phẩm đã có trong giỏ chưa
     const existingProduct = cart.find(item => item.id === product.id);
     if (existingProduct) {
         // Nếu có, tăng số lượng
         existingProduct.quantity += 1;
     } else {
         // Nếu không, thêm sản phẩm mới vào giỏ
         cart.push(product);
     }
     
     // Lưu giỏ hàng vào localStorage
     localStorage.setItem('cart', JSON.stringify(cart));
     
     // Thông báo sản phẩm đã được thêm vào giỏ
     alert("Sản phẩm đã được thêm vào giỏ hàng!");
 }

 // Thêm sự kiện cho nút "Thêm vào giỏ"
 document.addEventListener('DOMContentLoaded', () => {
     // Lấy tất cả các nút "Thêm vào giỏ"
     document.querySelectorAll('.add-to-cart').forEach(button => {
         button.addEventListener('click', function () {
             // Lấy thông tin sản phẩm từ DOM
             const productElement = this.closest('.product-item');
             const id = productElement.dataset.id;
             const name = productElement.querySelector('.product-name').textContent;
             const price = parseFloat(productElement.querySelector('.new-price').textContent.replace(/[^\d]/g, ''));
             const image = productElement.querySelector('img').src;

             // Tạo đối tượng sản phẩm
             const product = { id, name, price, image, quantity: 1 };

             // Gọi hàm thêm sản phẩm vào giỏ
             addToCart(product);
         });
     });
 });