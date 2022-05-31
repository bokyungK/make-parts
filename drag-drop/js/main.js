const cardItems = document.getElementsByClassName('card-item');
const cardContainer = document.getElementsByClassName('card-container')[0];
let moveData = 0;
let mouseValue = 0;
let startTouchX = 0;
let nowPosition = 0;

function touchEnd(event) {
    event.preventDefault();
    // cardContainer.removeEventListener('mousedown', touchStart);
    // window.removeEventListener('mousemove', touchMove);

    nowPosition = nowPosition + moveData;
    moveData = 0;
    mouseValue = 0;

    if (nowPosition > 0) {
        cardContainer.style.transition = 'transform 1s';
        cardContainer.style.transform = 'translateX(0)';
        nowPosition = 0;
    } else if (nowPosition < -480) {
        cardContainer.style.transition = 'transform 1s';
        cardContainer.style.transform = 'translateX(-480px)';
        nowPosition = -480;
    }
    // setTimeout(() => {
    //     cardContainer.addEventListener('mousedown', touchStart)
    //     window.addEventListener('mousemove', touchMove);
    // }, 500);

    // window.removeEventListener('mouseup', touchEnd);
    // window.removeEventListener('dragend', touchEnd);
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

    // window.addEventListener('mousemove', touchMove);
    // window.addEventListener('mouseup', touchEnd);
    // window.addEventListener('dragend', touchEnd);

    cardContainer.style.removeProperty('transition');
}

cardContainer.addEventListener('mousedown', touchStart);
window.addEventListener('mousemove', touchMove);
window.addEventListener('mouseup', touchEnd);
window.addEventListener('dragend', touchEnd);