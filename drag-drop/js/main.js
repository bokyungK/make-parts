const cardItems = document.getElementsByClassName('card-item');
const cardContainer = cardItems[0].parentNode;
const innerBox = cardContainer.parentNode;
let moveData = 0;
let mouseValue = 0;
let startTouchX = 0;
let nowPosition = 0;

function addStartEvent() {
    setTimeout(() => {
        for (let i = 0; i < cardItems.length; i++) {
            cardItems[i].addEventListener('mousedown', touchStart);
        }
    }, 1000)
}

function removeStartEvent() {
    for (let i = 0; i < cardItems.length; i++) {
        cardItems[i].removeEventListener('mousedown', touchStart);
    }
}

function touchEnd(event) {
    event.preventDefault();

    nowPosition = nowPosition + moveData;
    mouseValue = 0;

    cardContainer.style.transition = 'transform 1s';
    console.log(nowPosition);

    if (nowPosition > 0) {
        removeStartEvent();
        cardContainer.style.transform = 'translateX(0)';
        nowPosition = 0;
        addStartEvent();
    } else if (nowPosition < -((cardItems.length * (cardItems[0].clientWidth + 10)) - innerBox.clientWidth + 10)) {
        console.log(nowPosition);
        removeStartEvent();
        cardContainer.style.transform = 'translateX(-480px)';
        nowPosition = -480;
        addStartEvent();
    }
    moveData = 0;
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