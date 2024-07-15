
document.addEventListener("DOMContentLoaded", function () {
    /*======= Scroll =======*/
    window.addEventListener('scroll', function() {
        const header = document.getElementById("scrollHeader");
        const backTop = document.getElementById('backTop');
        const nsBackTop = document.getElementById('ns__back-top');

        const scrollPosition = window.scrollY;

        // Header animation
        if (scrollPosition > 100) {
            header.classList.add('sticky');
            backTop.classList.add('show');
        } else {
            header.classList.remove('sticky');
            backTop.classList.remove('show');
        }

        // Adjusting the height of the black overlay
        const windowHeight = document.documentElement.clientHeight;
        //Biến này lưu trữ chiều cao của khung nhìn (viewport) hiện tại, tức là chiều cao của vùng có thể nhìn thấy trên màn hình của trình duyệt. document.documentElement.clientHeight trả về chiều cao của phần tử gốc (thường là phần tử <html>) mà không bao gồm chiều cao của thanh cuộn ngang.
        const maxScrollHeight = document.documentElement.scrollHeight - windowHeight;
        //Biến này tính toán chiều cao tối đa có thể cuộn được của tài liệu. document.documentElement.scrollHeight trả về tổng chiều cao của nội dung tài liệu, bao gồm cả phần không nhìn thấy được (phần cần phải cuộn để xem). Bằng cách trừ đi windowHeight, chúng ta có được chiều cao tối đa mà người dùng có thể cuộn xuống.
        const scrollPercentage = (scrollPosition / maxScrollHeight) * 100;
        //Biến này lưu trữ vị trí cuộn dọc hiện tại của trang. window.scrollY trả về số pixel mà tài liệu đã cuộn từ trên xuống dưới. Đây là khoảng cách từ đầu tài liệu đến vị trí hiện tại của cuộn.
        nsBackTop.style.height = `${scrollPercentage}%`;
    });

    backTop.addEventListener('click', function(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });    
    });

    /*====== Slide Text Header =======*/
    const items = document.querySelectorAll('.list-paragraph .items');
    let currentIndex = 0;

    function showItem(index) {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    }

    function hideHeaderTop() {
        document.querySelector('.header-top').style.display = 'none';
    }
        function startAutoSlide() {
        intervalId = setInterval(showNext, 1000); 
    }

    function stopAutoSlide() {
        clearInterval(intervalId);
    }

    document.getElementById('next').addEventListener('click', function () {
        stopAutoSlide();
        showNext();
        startAutoSlide(); 
    });

    document.getElementById('prev').addEventListener('click', function () {
        stopAutoSlide(); 
        showPrev();
        startAutoSlide(); 
    });

    document.querySelector('.close-button').addEventListener('click', hideHeaderTop);

    startAutoSlide();

    /*====== PopUp Search ======*/
    const searchInput = document.getElementById('search-form');
    const popupSearch = document.querySelector('.popup-search');
    const popupSearchContaniner = document.querySelector('.popup-search-container');

    searchInput.addEventListener('click', function(){
        popupSearch.classList.add('popup-search-show');
        popupSearchContaniner.classList.add("is-open");
    });

    document.addEventListener('click', function(event){
        const isClickSearch = searchInput.contains(event.target);
        const isClickPopUp = popupSearch.contains(event.target);

        if(!isClickSearch && !isClickPopUp){
            popupSearch.classList.remove('popup-search-show');
            popupSearchContaniner.classList.remove("is-open");
        }
    });

    /*====== View All Demo ======*/
    const viewAllDemo = document.querySelector('.loadmore-menu');
    const dlg = document.querySelector('.dlg-demo-feature-full');
    const exitDialogView = document.querySelector('.close-button-dlg');
    function showDialog(){
        dlg.classList.add('show');
    }
    function hideDialog(){
        dlg.classList.remove('show');
    }
    viewAllDemo.addEventListener('click', showDialog);
    exitDialogView.addEventListener('click', hideDialog);

    //Khi click vào phần tử dlg (dialog overlay), kiểm tra nếu đối tượng được click (event.target) không nằm trong phần tử .dlg-demo-feature, thì gọi hàm hideDialog để ẩn dialog.
    //event.target.closest('.dlg-demo-feature') kiểm tra xem đối tượng được click có phải là hoặc nằm bên trong .dlg-demo-feature không. Nếu không, điều này có nghĩa là người dùng đã click ra ngoài dialog, và dialog sẽ bị ẩn đi.
    dlg.addEventListener('click', function(event) {
        if (!event.target.closest('.dlg-demo-feature')) {
            hideDialog();
        }
    });

    // Prevent dialog from closing when clicking inside it
    dlg.querySelector('.dlg-demo-feature').addEventListener('click', function(event) {
        event.stopPropagation();
    });
   
    /*====== Menu ======*/
    const mobileToggle = document.getElementById('mobile_menu_toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelectorAll('.close-button');
    const overlay = document.querySelector('.overlay_menu');
    const menuLinks = document.querySelectorAll('.main-menu-list, .categories-menu')

    // Function to show the mobile menu and overlay
    const showMobileMenu = () =>{
        mobileMenu.style.left = '0';
        showMainMenu();
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Hide Menu
    const hideMenu = () => {
        mobileMenu.style.left = "-120%";
        overlay.classList.remove('show')
        document.body.style.overflow = 'auto';
        document.querySelectorAll('.level').forEach(submenu => {
            setTimeout(() => submenu.classList.remove('show'), 1);
        });
    }

    mobileToggle.addEventListener('click', showMobileMenu);
    closeMenu.forEach(btnClose => btnClose.addEventListener('click', hideMenu));
    overlay.addEventListener('click', hideMenu);

    //Select Menu 
      // Handle menu link clicks
      menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetMenu = link.textContent.trim() === 'Menu' ? '.main-menu' : '.verticalmenu';
            showMenu(targetMenu);
        });
    });

    // Function to show the specified menu
    const showMenu = (targetMenu) => {
        document.querySelectorAll('.main-menu, .verticalmenu').forEach(menu => {
            menu.style.display = 'none';
        });
        document.querySelector(targetMenu).style.display = 'block';
    };

    const showMainMenu = () => {
        showMenu('.main-menu');
    };

    const handleSubmenu = (link) => {
        const submenuTarget = document.querySelector(link.getAttribute('data-target'));
        if (submenuTarget) {
            submenuTarget.classList.add('show');
        }
    };

    // Event listener for submenu links in Menu 1 and Menu 2
    document.querySelectorAll('.menu-level > a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            handleSubmenu(link);
        });
    });

    // Event listener for back buttons in submenus
    document.querySelectorAll('.submenu-mobile-title .back-main-menu').forEach(backLink => {
        backLink.addEventListener('click', () => {
            const parentSubmenu = backLink.closest('.level');
            parentSubmenu.classList.remove('show');
            setTimeout(() => parentSubmenu.classList.remove('show'), 1);
        });
    });

    // Event listener for closing submenus when clicking outside the menu
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !e.target.matches('#mobile_menu_toggle')) {
            document.querySelectorAll('.level').forEach(submenu => {
                setTimeout(() => submenu.classList.remove('show'), 1);
            });
        }
    });

    /*====== Cart ======*/
    const cartButton = document.querySelectorAll('.minicart-action');
    const overlayCart = document.querySelector('.overlay_cart');
    const cart = document.querySelector('.minicart-wrapper');
    const cartCounts = document.querySelectorAll('.cart-count');
    const cartTotalPriceDisplay = document.querySelector('.text-icons-total span:last-child');
    const closeCart = document.querySelector('.close-button-minicart');
    const addToCart = document.querySelectorAll('.btn-addtocart');
    const cartItemsContainer = document.querySelector('.product-list-cart');
    const cartTotal = document.querySelector('.bls-subtotal-price');
    const checkoutButton = document.querySelector('.btn-checkout');
    const cartEmpty = document.querySelector('.cart-body');
    const formCart = document.getElementById('form-mini-cart');
    const termsCheckbox = document.getElementById('conditions_form_minicart');
    const freeShippingThreshold = 100.00;
    const progressBar = document.querySelector('.percent_shipping_bar');
    const freeShippingMessage = document.querySelector('.cart-thres');
    const iconShipping = document.querySelector('.freeshipping-icon');
    const returnShop = document.querySelector('.button-close-cart');


    const minicartNote = document.querySelector('.mini_cart_note');
    const note = document.getElementById('note');
    const minicartGift = document.querySelector('.mini_cart_gift');
    const gift = document.getElementById('gift');
    const minicartShipping = document.querySelector('.mini_cart_shipping');
    const shipping = document.getElementById('shipping');
    const overlayMinicart = document.querySelector('.minicart-content');

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const updateLocalStorage = () => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };

    const showCart = () => {
        cart.classList.add('show');
        overlayCart.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    const hideCart = () => {
        cart.classList.remove('show');
        overlayCart.classList.remove('show');
        document.body.style.overflowY = 'auto';
        document.body.style.overflowX = 'hidden';
    }

    cartButton.forEach(button => {
        button.addEventListener('click', showCart)})
    
    const updateProgress = (progressPercentage) => {
        if (progressPercentage > 100) {
            progressPercentage = 100;
        }
    
        progressBar.style.width = `${progressPercentage}%`;
        iconShipping.style.left = `${progressPercentage}%`;
    
        if (progressPercentage > 0) {
            progressBar.style.backgroundColor = '#0D53BB';}
        else {
            progressBar.style.backgroundColor = '#ebebeb'; 
        }
    };

    const updateCart = () => {
        cartItemsContainer.innerHTML = '';

        if (cartItems.length === 0) {
            cartEmpty.style.display = "flex";
            formCart.style.display = "none";
            cartTotal.textContent = '$0.00';
            cartCounts.forEach(cartCount => {
                cartCount.textContent = '0';
            });
            cartTotalPriceDisplay.textContent = '$0.00';
            freeShippingMessage.innerHTML = `<span class="free-shipping-message">Spend $${freeShippingThreshold.toFixed(2)} more to enjoy <span class="freeship-text">FREE SHIPPING!</span></span>`;
            progressBar.style.width = '0%';
            iconShipping.style.left = `0%`;
            checkoutButton.disabled = true;
        } else {
            cartEmpty.style.display = "none";
            formCart.style.display = "flex";
            cartItems.innerHTML = ''; 
            let totalPrice = 0;
            let totalQuantity = 0;

            cartItems.forEach(item => {
                if (item.newPrice !== null && item.discountPrice !== null) {
                    priceContent = `
                        <p class="pro-price">
                            <span class="pro-price-new">$${item.newPrice.toFixed(2)}</span>
                            <span class="pro-price-del"><del>$${item.discountPrice.toFixed(2)}</del></span>
                        </p>
                    `;
                } else if (item.price !== null) {
                    priceContent = `<p class="pro-price pro-price-regular">$${item.price.toFixed(2)}</p>`;
                }

                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item', 'd-flex', 'flex-row');
                itemElement.innerHTML = `
                            <div class="cart-image">
                                <a aria-label="product image 1" href="#" class="aspect-ratio-container aspect-ratio-boxes" style="--aspect-ratio: 1/1;">
                                    <img src="${item.img}" loading="lazy" width="226" height="226" alt="${item.name}">
                                </a>
                            </div>
                            <div class="pro-info m-0">
                                <h4 class="pro-name">
                                    <a aria-label="Name product" href="#">${item.name}</a>
                                </h4>
                                ${priceContent}
                                <div class="minicart-actions">
                                    <div class="quality">
                                        <button class="quantity_button btn-reset d-flex justify-content-center align-items-center" name="minus" type="button">
                                            <svg width="11" height="12" viewBox="0 0 11 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11 0.5L11 1.5L-4.37114e-08 1.5L0 0.5L11 0.5Z" fill="#111111"></path>
                                            </svg>
                                        </button>
                                        <input class="quantity-input text-center p-0-important" type="text" name="updates[]" value="${item.quantity}" data-value="${item.quantity}">
                                        <button class="quantity_button btn-reset d-flex justify-content-center align-items-center" name="plus" type="button">
                                            <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 11.5H6L6 6.5H11V5.5H6L6 0.5H5L5 5.5H0V6.5H5L5 11.5Z" fill="#111111"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="item-edit d-flex flex-column align-items-center gap-2">
                                <button class="icon-edit" aria-label="remove item">
                                    <svg width="20px" height="20px">
                                        <use xlink:href="sprite.svg#remove"></use>
                                    </svg> 
                                </button>
                                <button class="icon-edit" aria-label="edit item notes">
                                    <svg width="20px" height="20px">
                                        <use xlink:href="sprite.svg#edit"></use>
                                    </svg>
                                </button>
                            </div>
                `;
                cartItemsContainer.appendChild(itemElement);

                itemElement.querySelector('[name="minus"]').addEventListener('click', () => {
                    if (item.quantity > 1) {
                        item.quantity--;
                    } else {
                        cartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
                    }
                    updateCart();
                });

                itemElement.querySelector('[name="plus"]').addEventListener('click', () => {
                    item.quantity++;
                    updateCart();
                });

                itemElement.querySelector('[aria-label="remove item"]').addEventListener('click', () => {
                    cartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
                    updateCart();
                });

                totalPrice += (item.newPrice !== null ? item.newPrice : item.price) * item.quantity;
                totalQuantity += item.quantity;
            });
            

            cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
            cartCounts.forEach(cartCount => {
                cartCount.textContent = totalQuantity;
            });
            cartTotalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;

            const remainingAmount = freeShippingThreshold - totalPrice;
            const progressPercentage = (totalPrice / freeShippingThreshold) * 100;

            updateProgress(progressPercentage);
            if (remainingAmount > 0) {
                progressBar.style.width = `${(totalPrice / freeShippingThreshold) * 100}%`;
                freeShippingMessage.innerHTML = `<span class="free-shipping-message">Spend $${remainingAmount.toFixed(2)} more to enjoy <span class="freeship-text">FREE SHIPPING!</span></span>`;
            } else {
                progressBar.style.width = '100%';
                freeShippingMessage.innerHTML = `<span class="free-shipping-message">Congratulations! You've got free shipping!</span>`;
            }
        }
        updateLocalStorage();
    }

    addToCart.forEach(btn =>{
        btn.addEventListener('click', (e) => {
            const productElement = e.target.closest('.col-pro-items');
            const productName = productElement.querySelector('.pro-name a').textContent;
            const productImg = productElement.querySelector('.pro-image img').src;

            let productPrice = null;
            let newPrice = null;
            let discountPrice = null;

            const regularPriceElement = productElement.querySelector('.pro-price-regular');
            const discountPriceElement = productElement.querySelector('.pro-price-del');
            const newPriceElement = productElement.querySelector('.pro-price-new');

            if (regularPriceElement) {
                productPrice = parseFloat(regularPriceElement.textContent.replace('$', ''));
            }

            if (discountPriceElement) {
                discountPrice = parseFloat(discountPriceElement.textContent.replace('$', ''));
            }

            if (newPriceElement) {
                newPrice = parseFloat(newPriceElement.textContent.replace('$', ''));
            }

            // const existingItem = cartItems.find(item => item.name === productName);
            const existingItem = cartItems.find(item => item.id === Date.now());
            if(existingItem){
                existingItem.quantity++;
            }
            else {
                cartItems.push({
                    id: Date.now(),
                    name: productName,
                    price: productPrice,
                    newPrice: newPrice,
                    discountPrice: discountPrice,
                    img: productImg,
                    quantity: 1
                });
            }
            updateCart();
            showCart();
        })
    });

    termsCheckbox.addEventListener('change', () => {
        checkoutButton.disabled = !termsCheckbox.checked;
    });

    minicartNote.addEventListener('click', () => {
        note.classList.add('show');
        overlayMinicart.classList.add('show');
    });

    minicartGift.addEventListener('click', () => {
        gift.classList.add('show');
        overlayMinicart.classList.add('show');
    });

    minicartShipping.addEventListener('click', () => {
        shipping.classList.add('show');
        overlayMinicart.classList.add('show');
    });

    returnShop.addEventListener('click', hideCart);
    closeCart.addEventListener('click', hideCart);
    overlayCart.addEventListener('click', hideCart);

    const cancelButtons = document.querySelectorAll('.btn-cancel');
    cancelButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.closest('.addon').classList.remove('show');
            overlayMinicart.classList.remove('show');
        });
    });
    updateCart();
});  

    /*====== SlideShow ======*/
document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll('.slide-items');
    const dots = document.querySelectorAll('.dots li');
    let currentIndex = 0;
    let intervalId;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'flex' : 'none';
            });
        }

        function showDot(index) {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function startAutoSlide() {
            intervalId = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                showSlide(currentIndex);
                showDot(currentIndex);
            }, 3000);
        }

        function stopAutoSlide() {
            clearInterval(intervalId);
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                stopAutoSlide();
                showSlide(currentIndex);
                showDot(currentIndex); 
                startAutoSlide(); 
            });
        });
        startAutoSlide(); 
});

/*===== Swiper Slide =====*/
const SwiperSlide = new Swiper('.slide-collection', {
    slidesPerView: 4,
    spaceBetween : 20,
    loop: true,
    centerSlide: 'true',
    freeMode: 'true',

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1200: {
            slidesPerView: 4,
        },
    },
  });


  const SwiperPro = new Swiper('.slide-production', {
    slidesPerView: 5,
    loop: true,
    centerSlide: 'true',
    freeMode: 'true',

    breakpoints: {
        0: {
            slidesPerView: 2,
            spaceBetween : 10,
        },
        768: {
            slidesPerView: 3,
            spaceBetween : 15,
        
        },
        1200: {
            slidesPerView: 5,
            spaceBetween : 20,
        },
    },
  });

 /*============ Footer Bottom =============*/
var toggleContent = document.getElementsByClassName('col-footer-item');

for (var i = 0; i < toggleContent.length; i++) {
    var title = toggleContent[i].getElementsByClassName('title-links')[0];

    title.addEventListener('click', function(e) {
        e.stopPropagation();
        var openToggle = this.querySelector('.open-children-toggle');
        openToggle.classList.toggle('visible');
        var contentList = this.nextElementSibling;
        contentList.classList.toggle('visible');
    });
}


//
document.getElementById('language_btn').addEventListener('click', function(event) {
    toggleDropdown(event, 'language_btn');
});

document.getElementById('currency_btn').addEventListener('click', function(event) {
    toggleDropdown(event, 'currency_btn');
});

function toggleDropdown(event, buttonId) {
    event.stopPropagation();
    const button = document.getElementById(buttonId);
    const dropdownMenu = button.nextElementSibling;

    document.querySelectorAll('.dropdown-menu').forEach(function(menu) {
        if (menu !== dropdownMenu) {
            menu.style.display = 'none';
        }
    });

    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
    } else {
        dropdownMenu.style.display = 'block';
    }
}
