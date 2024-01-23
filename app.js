let lists = document.querySelector('.slider-header-top .list-paragraph');
let items = document.querySelectorAll('.slider-header-top .list-paragraph .items');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let active = 0;
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
}
