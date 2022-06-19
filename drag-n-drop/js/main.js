// 슬라이더
const buttonLeft = document.getElementsByClassName('button-left')[0];
const buttonRight = document.getElementsByClassName('button-right')[0];
const cardContainer = document.getElementsByClassName('card-container')[0];
const liList = cardContainer.children;
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


// 카드 드래그
let startLi = 0;
let startLiX = 0;
let mouseValue = 0;
let moveDist = 0;
let cardMove = 0;
const arrLiList = Array.from(liList);

    // 드래그 이벤트
function startDrag (event) {
    event.preventDefault();

    // mouseValue = 1;
    startLi = event.target;
    startLi.style.removeProperty('transition');
    startLi.style.zIndex = 1;

    startLiX = event.clientX;

    window.addEventListener('mousemove', moveDrag);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('dragend', endDrag);
}

function moveDrag (event) {
    event.preventDefault();

    moveDist = event.clientX - startLiX;
    startLi.style.transform = 'translateX(' + String(moveDist) + 'px';
    const nextCard = startLi.nextElementSibling;
    const previousCard = startLi.previousElementSibling;

    // 우측 이동
    if (moveDist > 230 && moveDist < 460) {
        // 카드 한 번만 넘긴 경우
        cardMove = 1;
        nextCard.style.transform = 'translateX(-160px)';
    } else if (moveDist < 230) {
        // 카드 안 넘긴 경우
        cardMove = 0;
        nextCard.style.transform = 'translateX(0)';
    }

    // 좌측 이동
    if (moveDist < -230 && moveDist > -460) {
        cardMove = 1;
        previousCard.style.transform = 'translateX(160px)';
    } else if (moveDist > - 230) {
        cardMove = 0;
        previousCard.style.transform = 'translateX(0)';
    }
}

function endDrag (event) {
    event.preventDefault();

    // 위치 조정해도 문제 없는지 확인하기
    window.removeEventListener('mousemove', moveDrag);
    window.removeEventListener('mouseup', endDrag);
    window.removeEventListener('dragend', endDrag);

    startLi.style.removeProperty('z-index');
    const nextCard = startLi.nextElementSibling;
    const previousCard = startLi.previousElementSibling;

    // 카드 우측 이동 결과
    if (moveDist > 230 && moveDist < 460) {
        startLi.style.transform = 'translateX(160px)';
        cardMove = 0;

        // 카드 순서 갱신
        const standardCard = nextCard.nextElementSibling;
        cardContainer.removeChild(startLi);
        startLi.style.removeProperty('transform');
        cardContainer.removeChild(nextCard);
        nextCard.style.removeProperty('transform');

        cardContainer.insertBefore(startLi, standardCard);
        cardContainer.insertBefore(nextCard, standardCard.previousElementSibling);
    } else {
        startLi.style.transition = 'transform .5s';
        startLi.style.transform = 'translateX(0)';
    }

    // 카드 좌측 이동 결과
    if (moveDist < -230 && moveDist > -460) {
        startLi.style.transform = 'translateX(-160px)';
        cardMove = 0;

        // 카드 순서 갱신
        const standardCard = startLi.nextElementSibling;
        cardContainer.removeChild(startLi);
        startLi.style.removeProperty('transform');
        cardContainer.removeChild(previousCard);
        previousCard.style.removeProperty('transform');

        cardContainer.insertBefore(previousCard, standardCard);
        cardContainer.insertBefore(startLi, standardCard.previousElementSibling);
    } else {
        startLi.style.transition = 'transform .5s';
        startLi.style.transform = 'translateX(0)';
    }
    moveDist = 0;
    startLi = 0;
}

    // 드래그 이벤트 생성
for (let i = 0; i < liList.length; i++) {
    liList[i].addEventListener('mousedown', startDrag);
}
