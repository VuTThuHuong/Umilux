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
        document.querySelector('.slider-header-top').style.display = 'none';
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
const swiper = new Swiper('.slide-collection', {
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


  const swiperPro = new Swiper('.slide-production', {
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