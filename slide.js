document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll('.list-paragraph .item');
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
        document.querySelector('.slider-header-top').style.display = 'none';
    }

    document.getElementById('next').addEventListener('click', showNext);
    document.getElementById('prev').addEventListener('click', showPrev);
    document.querySelector('.close-button').addEventListener('click', hideHeaderTop);

    setInterval(showNext, 1000);
});


document.addEventListener("DOMContentLoaded", function () {
    const slideList = document.querySelector('.slide-list');
    const slides = document.querySelectorAll('.slide-items');
    const totalSlides = slides.length;
    let currentIndex = 0;

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlidePosition();
    }

    function updateSlidePosition() {
        const newPosition = -currentIndex * 100 + '%';
        slideList.style.transform = 'translateX(' + newPosition + ')';
    }
    setInterval(showNextSlide, 3000);

});
