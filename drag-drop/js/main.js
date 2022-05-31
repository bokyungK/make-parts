// 슬라이더 드래그 조작

const cardItems = document.getElementsByClassName('card-item');
const cardContainer = document.getElementsByClassName('card-container')[0];
let moveData = 0;
let mouseValue = 0;
let startTouchX = 0;
let nowPosition = 0;

function touchEnd(event) {
    event.preventDefault();

    nowPosition = nowPosition + moveData;
    mouseValue = 0;

    // if (nowPosition > 0) {
    //     cardContainer.style.transition = 'transform 1s';
    //     cardContainer.style.transform = 'translateX(0)';
    // } else if (nowPosition < -480) {
    //     cardContainer.style.transition = 'transform 1s';
    //     cardContainer.style.transform = 'translateX(-480px)';
    // }
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

    startTouchX = event.clientX;
    mouseValue = 1;

    cardContainer.style.removeProperty('transition');
}

cardContainer.addEventListener('mousedown', touchStart);
window.addEventListener('mousemove', touchMove);
window.addEventListener('mouseup', touchEnd);
window.addEventListener('dragend', touchEnd);