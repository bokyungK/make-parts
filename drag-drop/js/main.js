const cardItems = document.getElementsByClassName('card-item');
const cardContainer = document.getElementsByClassName('card-container')[0];
let moveData = 0;
let mouseValue = 0;
let startTouchX = 0;
let nowPosition = 0;

function touchEnd(event) {
    event.preventDefault();

    nowPosition = nowPosition + moveData;
    moveData = 0;
    mouseValue = 0;

    cardContainer.style.transition = 'transform 1s';

    if (nowPosition > 0) {
        cardContainer.style.transform = 'translateX(0)';
        nowPosition = 0;
    } else if (nowPosition < -480) {
        cardContainer.style.transform = 'translateX(-480px)';
        nowPosition = -480;
    }
}

function touchMove(event) {
    event.preventDefault();

    if (mouseValue === 1) {
        moveData = (event.clientX - startTouchX);
        cardContainer.style.transform = 'translateX(' + String(nowPosition + moveData) + 'px';
    }
}

function touchStart(event) {
    event.preventDefault();

    cardContainer.style.removeProperty('transition');
    startTouchX = event.clientX;
    mouseValue = 1;
}

for (let i = 0; i < cardItems.length; i++) {
    cardItems[i].addEventListener('mousedown', touchStart);
}
window.addEventListener('mousemove', touchMove);
window.addEventListener('mouseup', touchEnd);
window.addEventListener('dragend', touchEnd);