const buttonLeft = document.getElementsByClassName('button-left')[0];
const buttonRight = document.getElementsByClassName('button-right')[0];
const cardContainer = document.getElementsByClassName('card-container')[0];
const liList = document.getElementsByClassName('card-item');
let moveData = 0;
buttonLeft.style.backgroundColor = 'lightgray';
buttonRight.classList.add('button-right-on');

function moveRight(event) {
    if (moveData < 0) {
        const buttonLeft = event.target;
        moveData = moveData + 160;

        buttonRight.style.backgroundColor = 'gold';
        buttonRight.style.transition = 'background-color 1s';
        buttonRight.classList.add('button-right-on');
        // buttonRight.removeEventListener('click', moveLeft);

        cardContainer.style.transition = 'transform 1s';
        cardContainer.style.transform = 'translateX(' + String(moveData) + 'px';

        if (moveData === 0) {
            buttonLeft.style.backgroundColor = 'lightgray';
            buttonLeft.style.transition = 'background-color 1s';
            buttonLeft.classList.remove('button-left-on');
            // buttonLeft.addEventListener('click', moveRight)

            buttonRight.style.backgroundColor = 'gold';
            buttonRight.style.transition = 'background-color 1s';
            buttonRight.classList.add('button-right-on');
            // buttonRight.removeEventListener('click', moveLeft);
        }
    }
}

function moveLeft(event) {
    if ((liList.length * 160) + moveData + 10 > 810) {
        const buttonRight = event.target;
        moveData = moveData + (-160);

        cardContainer.setAttribute('data-position', moveData);
        cardContainer.style.transition = 'transform 1s';
        cardContainer.style.transform = 'translateX(' + String(moveData) + 'px';

        buttonLeft.style.backgroundColor = 'gold';
        buttonLeft.style.transition = 'background-color 1s';
        buttonLeft.classList.add('button-left-on');
        // buttonLeft.addEventListener('click', moveRight)

        if ((liList.length * 160) + moveData + 10 <= 810) {
            buttonRight.style.backgroundColor = 'lightgray';
            buttonRight.style.transition = 'background-color 1s';
            buttonRight.classList.remove('button-right-on');
            // buttonRight.removeEventListener('click', moveLeft);

            buttonLeft.style.backgroundColor = 'gold';
            buttonLeft.style.transition = 'background-color 1s';
            buttonLeft.classList.add('button-left-on');
            // buttonLeft.addEventListener('click', moveRight)
        }
    }
}

buttonLeft.addEventListener('click', moveRight)
buttonRight.addEventListener('click', moveLeft);

