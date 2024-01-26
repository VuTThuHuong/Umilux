let lists = document.querySelector('.slideshow .slide-list');
let items = document.querySelectorAll('.slideshow .slide-list .slide-items');

let active = 0;
let lengthItem = items.length - 1;
next.onclick = function(){
    if(active + 1 > lengthItem){
        active = 0;
    }
    else{
        active = active + 1;
    }
    reloadSlider();
}
prev.onclick = function(){
    if(active - 1 > 0){
        active = lengthItem;
    }
    else{
        active = active - 1;
    }
    reloadSlider();
}
let refreshSlider = setInterval(() => {next.click()},3000);
function reloadSlider(){
    let checkleft = items[active].offsetLeft;
    lists.style.left = -checkleft + 'px';

    let lastActiveDot = document.querySelector('.slideshow .list-dots li.active');
    lastActiveDot.classList.remove('active');
    list-dots[active].classList.add('active');
}

dots.forEach((li, key) => {
    li.addEventListener('click', function () {
        active = key;
        reloadSlider();
    })
})
