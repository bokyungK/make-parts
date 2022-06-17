// 슬라이더
const buttonLeft = document.getElementsByClassName('button-left')[0];
const buttonRight = document.getElementsByClassName('button-right')[0];
const cardContainer = document.getElementsByClassName('card-container')[0];
let liList = cardContainer.children;
let moveData = 0;
buttonLeft.style.backgroundColor = 'lightgray';
buttonRight.classList.add('button-right-on');

function moveRight(event) {
    buttonRight.addEventListener('click', moveLeft);

    if (moveData < 0) {
        const buttonLeft = event.target;
        moveData = moveData + 160;

        buttonRight.style.backgroundColor = 'gold';
        buttonRight.style.transition = 'background-color 1s';
        buttonRight.classList.add('button-right-on');

        cardContainer.style.transition = 'transform 1s';
        cardContainer.style.transform = 'translateX(' + String(moveData) + 'px';

        if (moveData === 0) {
            buttonLeft.removeEventListener('click', moveRight);

            buttonLeft.style.backgroundColor = 'lightgray';
            buttonLeft.style.transition = 'background-color 1s';
            buttonLeft.classList.remove('button-left-on');

            buttonRight.style.backgroundColor = 'gold';
            buttonRight.style.transition = 'background-color 1s';
            buttonRight.classList.add('button-right-on');
        }
    }
}

function moveLeft(event) {
    buttonLeft.addEventListener('click', moveRight);

    if ((liList.length * 160) + moveData + 10 > 810) {
        const buttonRight = event.target;
        moveData = moveData + (-160);

        cardContainer.setAttribute('data-position', moveData);
        cardContainer.style.transition = 'transform 1s';
        cardContainer.style.transform = 'translateX(' + String(moveData) + 'px';

        buttonLeft.style.backgroundColor = 'gold';
        buttonLeft.style.transition = 'background-color 1s';
        buttonLeft.classList.add('button-left-on');

        if ((liList.length * 160) + moveData + 10 <= 810) {
            buttonRight.removeEventListener('click', moveLeft);

            buttonRight.style.backgroundColor = 'lightgray';
            buttonRight.style.transition = 'background-color 1s';
            buttonRight.classList.remove('button-right-on');

            buttonLeft.style.backgroundColor = 'gold';
            buttonLeft.style.transition = 'background-color 1s';
            buttonLeft.classList.add('button-left-on');
        }
    }
}

buttonRight.addEventListener('click', moveLeft);


// 카드 드래그&드롭
let startLi = 0;
let startLiX = 0;
let mouseValue = 0;
let moveDist = 0;
const blankLi = document.createElement('li');

    // 드래그 이벤트 설정
function startDrag (event) {
    event.preventDefault();

    // mouseValue = 1;
    startLi = event.target;
    startLiX = event.clientX;

    window.addEventListener('mousemove', moveDrag);
}

function moveDrag (event) {
    event.preventDefault();

    moveDist = event.clientX - startLiX;
    startLi.style.transform = 'translate(' + String(moveDist) + 'px'
    if (moveDist > 80) {
        const content = Number(startLi.innerText);
        console.log(content);

        // cardContainer.replaceChild(liList[0], cardContainer.children[0]);
        // console.log(cardContainer);

    } 
    // else if (moveDist < -80) {
    //     let replacedCard = startLi.previousElementSibling;
    //     replacedCard.style.transition = 'transform 1s';
    //     replacedCard.style.transform = 'translate(160px)';
    //     startLi.style.transition = 'transform 1s';
    //     startLi.style.transform = 'translate(-160px)';
    // }
}

function endDrag (event) {
    event.preventDefault();
    moveDist = 0;
    window.removeEventListener('mousemove', moveDrag);
}

    // 드래그 이벤트 생성
for (let i = 0; i < liList.length; i++) {
    liList[i].addEventListener('mousedown', startDrag);
}
window.addEventListener('mouseup', endDrag);
window.addEventListener('dragend', endDrag);

