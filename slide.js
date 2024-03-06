document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll('.list-paragraph .items');
    let currentIndex = 0;
    let intervalId;

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

    function startIntervalAfterDelay() {
        clearInterval(intervalId);
        setTimeout(() => {
            intervalId = setInterval(showNext, 1000);
        }, 3000);
    }

    document.getElementById('next').addEventListener('click', showNext);
    document.getElementById('prev').addEventListener('click', showPrev);
    document.querySelector('.close-button').addEventListener('click', hideHeaderTop);

    // Khởi động interval ban đầu
    startIntervalAfterDelay();
});


document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 1;
    let intervalId;
  
    function showSlides(n) {
      const slides = document.querySelector('.slide-list');
      const dots = document.querySelectorAll('.dots li');
  
      if (n > slides.children.length) {
        slideIndex = 1;
      }
  
      if (n < 1) {
        slideIndex = slides.children.length;
      }
  
      for (let i = 0; i < slides.children.length; i++) {
        slides.children[i].style.display = 'none';
      }
  
      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
      }
  
      slides.children[slideIndex - 1].style.display = 'flex';
      dots[slideIndex - 1].classList.add('active');
    }
  
    function currentSlide(n) {
      clearInterval(intervalId);
      showSlides(slideIndex = n);
      startAutoSlide();
    }
  
    function startAutoSlide() {
      intervalId = setInterval(() => {
        showSlides(slideIndex += 1);
      }, 5000);
    }
  
    document.querySelectorAll('.dots li').forEach((dot, index) => {
      dot.addEventListener('click', () => {
        clearInterval(intervalId);
        currentSlide(index + 1);
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
function toggleContent(elementId) {
  var element = document.getElementById(elementId);
  var toggleIcon1 = element.previousElementSibling.querySelector('.toggleIcon1');
  var toggleIcon2 = element.previousElementSibling.querySelector('.toggleIcon2');
  

  if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
      toggleIcon1.style.display = 'none';
      toggleIcon2.style.display = 'inline-block';
      element.style.animation = "animateUpToDown 0.4s ease";
  } else {
      // Nếu đang hiển thị, ẩn
      element.classList.add('hidden');
      toggleIcon1.style.display = 'inline-block';
      toggleIcon2.style.display = 'none';
      element.style.animation = "animateCloseUpToDown 0.4s ease";
  }
}

