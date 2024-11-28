document.addEventListener("DOMContentLoaded", () => {
    // Trạng thái mặc định: chưa đăng nhập
    let loggedIn = false;
    let userRole = localStorage.getItem('userRole') || 'user'; // Lấy vai trò người dùng từ localStorage

    // Hàm cập nhật giao diện
    function updateUI() {
        const loginButton = document.getElementById("login-button");
        const profileIcon = document.getElementById("profile-icon");
        const cartIcon = document.getElementById("cart-icon");
        const addProductMenu = document.getElementById("add-product");

        if (loggedIn) {
            loginButton.style.display = "none";
            profileIcon.style.display = "inline-block";
            cartIcon.style.display = "inline-block";

            // Nếu là admin, hiển thị mục "Thêm sản phẩm"
            if (userRole === 'admin') {
                addProductMenu.style.display = "inline-block";
            }
        } else {
            loginButton.style.display = "inline-block";
            profileIcon.style.display = "none";
            cartIcon.style.display = "none";
            addProductMenu.style.display = "none"; // Ẩn "Thêm sản phẩm" nếu chưa đăng nhập
        }
    }

    // Cập nhật lại giao diện khi tải trang
    updateUI();

    // Xử lý sự kiện Login
    const loginButton = document.getElementById("login-button");
    if (loginButton) {
        loginButton.addEventListener("click", (e) => {
            e.preventDefault();
            loggedIn = true; // Cập nhật trạng thái đăng nhập
            alert("Đăng nhập thành công!");

            // Giả sử bạn đã có một cơ chế xác thực và phân quyền ở đây
            // Lưu vai trò người dùng vào localStorage
            userRole = 'admin'; // Giả sử đăng nhập với vai trò admin
            localStorage.setItem('userRole', userRole);

            updateUI(); // Cập nhật lại giao diện
        });
    }
});

// Sidebar toggle
const sidebar = document.getElementById("sidebar");
const toggleButtons = document.querySelectorAll(".navbar-toggler, .close-btn");
toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        sidebar.classList.toggle("show");
    });
});

// Slider
const slides = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
    });
}

showSlide(currentSlide);

prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

// Auto-slide
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

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

// JavaScript cho Trang Chủ (Homepage)
// Lưu dữ liệu sản phẩm vào localStorage khi trang được tải
function redirectToProductDetail(productId) {
    // Redirect to product-detail.html with the product ID
    window.location.href = `product-detail.html?id=${productId}`;
}
const products = [
    {
        id: 1,
        name: "Dell XPS 13 9340",
        brand: "Dell",
        price: 11290000,
        oldPrice: 15990000,
        discount: -29,
        imageUrl: "../img/lap1.webp",
        features: [
            "Màn hình 13 inch 3K OLED",
            "Core Ultra 7-155H",
            "RAM 32GB, SSD 1TB"
        ]
    },
    {
        id: 2,
        name: "Acer Nitro V 16 ProPanel",
        brand: "Lenovoer",
        price: 6490000,
        oldPrice: 9990000,
        discount: -35,
        imageUrl: "../img/lap2.jpg",
        features: [
            "AMD Ryzen 7 8845HS",
            "16GB RAM, 512GB SSD",
            "RTX 4060 8GB"
        ]
    },
    {
        id: 3,
        name: "Dell XPS 13 9340 2024 Core Ultra 7-155H RAM 32GB SSD 1TB 3K OLED",
        brand: "Dell XPS",
        price: 1490000,
        oldPrice: 1990000,
        discount: -35,
        imageUrl: "../img/lap3.jpg",
        features: [
            "AMD Ryzen 7 8845HS",
            "16GB RAM, 512GB SSD",
            "RTX 4060 8GB"
        ]
    },
    {
        id: 4,
        name: "Atussian",
        brand: "Dell XPS",
        price: 1490000,
        oldPrice: 1990000,
        discount: -35,
        imageUrl: "../img/lap4.jpg",
        features: [
            "AMD Ryzen 7 8845HS",
            "16GB RAM, 512GB SSD",
            "RTX 4060 8GB"
        ]
    }
    // Các sản phẩm khác...
];

// Lưu tất cả sản phẩm vào localStorage
localStorage.setItem('productDetails', JSON.stringify(products));

