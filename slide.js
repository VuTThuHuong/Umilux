
document.addEventListener("DOMContentLoaded", function () {
    // Slide Text Header
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

    // PopUp Search 
    const searchInput = document.getElementById('search-form');
    const popupSearch = document.querySelector('.popup-search');

    searchInput.addEventListener('click', function(){
        popupSearch.classList.add('popup-search-show');
    });

    document.addEventListener('click', function(event){
        const isClickSearch = searchInput.contains(event.target);
        const isClickPopUp = popupSearch.contains(event.target);

        if(!isClickSearch && !isClickPopUp){
            popupSearch.classList.remove('popup-search-show');
        }
    });

    // View All Demo 
    const viewAllDemo = document.querySelector('.loadmore-menu');
    const dlgViewAllDemo = document.querySelector('.dlg-demo-feature-full');
    const exitDialogView = document.querySelector('.close-button-dlg');

    viewAllDemo.addEventListener('click', function(){
        dlgViewAllDemo.classList.add('dlg');
    })

    exitDialogView.addEventListener('click', function(){
        dlgViewAllDemo.classList.remove('dlg');
    })
   
});

    // Slide Text Header
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


/*========== Menu ===========*/
function showMainMenu() {
  document.querySelector(".main-menu-list").classList.add("active");
  document.querySelector(".categories").classList.remove("active");
  document.querySelector(".main-menu").style.display = "block";
  document.querySelector(".verticalmenu").style.display = "none";
}

function showCategories() {
  document.querySelector(".categories").classList.add("active");
  document.querySelector(".main-menu-list").classList.remove("active");
  document.querySelector(".main-menu").style.display = "none";
  document.querySelector(".verticalmenu").style.display = "block";
}

function closeMenu() {
  document.querySelector(".main-menu-list").classList.remove("active");
  document.querySelector(".categories").classList.remove("active");
  document.querySelector(".mobile-menu").style.left = "-120%";
  document.body.classList.remove('overlay-active');
}

function toggleSubmenu(item) {
  var submenu = item.querySelector('.submenu');
  submenu.classList.toggle('active');
  // if(submenu.classList.add('active')){
  //   toggleSubchildmenu(item);
  // }
  // else {
  //   submenu.classList.toggle('active');
  // }
}

function toggleSubchildmenu(item) {
  var subchildmenu = item.nextElementSibling; // Assuming subchildmenu is the next sibling
  subchildmenu.classList.toggle('active');
}

document.getElementById("mobile_menu_toggle").addEventListener("click", function () {
  const mobileMenu = document.querySelector(".mobile-menu");
  if (mobileMenu.style.left === "-120%") {
      mobileMenu.style.left = "0px";
      document.body.classList.toggle('overlay-active');
      showMainMenu();
  } else {
      closeMenu();
  }
});

 /*============ Footer Bottom =============*/
var toggleContent = document.getElementsByClassName('col-footer-item');

for(i=0; i<toggleContent.length; i++) {
  toggleContent[i].addEventListener('click', function(){
    this.classList.toggle('visible');
  })
}