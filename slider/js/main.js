const buttonLeft = document.getElementsByClassName('button-left')[0];
const buttonRight = document.getElementsByClassName('button-right')[0];
const cardContainer = document.getElementsByClassName('card-container')[0];
const liList = document.getElementsByClassName('card-item');
let moveData = 0;

function moveRight(event) {
    if (moveData < 0) {
        const buttonLeft = event.target;
        moveData = moveData + 160;

        cardContainer.style.transition = 'transform 1s';
        cardContainer.style.transform = 'translateX(' + String(moveData) + 'px';
    }
}

function moveLeft(event) {
    if ((liList.length * 160) + moveData > 800) {
        const buttonRight = event.target;
        moveData = moveData + (-160);

        cardContainer.setAttribute('data-position', moveData);
        cardContainer.style.transition = 'transform 1s';
        cardContainer.style.transform = 'translateX(' + String(moveData) + 'px';
    }   
}

buttonLeft.addEventListener('click', moveRight)
buttonRight.addEventListener('click', moveLeft);

