document.addEventListener('DOMContentLoaded', () => {


    const squares = document.querySelectorAll('.grid div');
    const timeLeft = document.querySelector('span');
    const result = document.querySelector('#result');
    const startBtn = document.querySelector('#button');
    const carsLeft = document.querySelectorAll('.car-left');
    const carsRight = document.querySelectorAll('.car-right');
    const logsLeft = document.querySelectorAll('.log-left');
    const logsRight = document.querySelectorAll('.log-right');



    const width = 9 //div width = 9
    let currentIndex = 76 // starting position -- posição inicial
    let currentTime = 20
    let timerId //countdown

    //show frog on starting block -- mostrar sapo na pos. inicial
    squares[currentIndex].classList.add('frog');

    //move frog with keywords -- mover sapo com as setas do teclado
    function moveFrog(e) {
        squares[currentIndex].classList.remove('frog');
        //remove frog class in order to change it's position later on
        //remove a classe frog da posição atual para depois mudar sua posição 
        switch (e.key) {
            case "ArrowLeft":
                if (currentIndex % width !== 0) currentIndex -= 1; //prevents frog from moving past the left wall
                break;                                             //impede que o sapo se mova atraves da parede esquerda
            case "ArrowUp":
                if (currentIndex - width >= 0) currentIndex -= width; //prevents frog from moving past the upper wall
                break;                                                //impede que o sapo se mova atraves da parede superior
            case "ArrowRight":
                if (currentIndex % width < width - 1) currentIndex += 1; //prevents frog from moving past the right wall
                break;                                                   //impede que o sapo se mova atraves da parede direita
            case "ArrowDown":
                if (currentIndex + width < width * width) currentIndex += width; //prevents frog from moving past the bottom wall
                break;                                                         //impede que o sapo se mova atraves da parede inferior
        }
        squares[currentIndex].classList.add('frog');
        //to every keypress we'll check for winning or losing conditions
        win();
        lose();
    }


    //function to move cars -- função para movimentar os carros
    function autoMoveCars() {
        carsLeft.forEach(carLeft => moveCarLeft(carLeft))
        carsRight.forEach(carRight => moveCarRight(carRight))
    }
    //function to move logs -- função para movimentar as madeiras
    function autoMoveLogs() {
        logsLeft.forEach(logLeft => moveLogLeft(logLeft))
        logsRight.forEach(logRight => moveLogRight(logRight))





    }
    //move cars left
    function moveCarLeft(carLeft) {
        switch (true) {
            case carLeft.classList.contains('c1'):
                carLeft.classList.remove('c1');
                carLeft.classList.add('c2');
                break
            case carLeft.classList.contains('c2'):
                carLeft.classList.remove('c2');
                carLeft.classList.add('c3');
                break
            case carLeft.classList.contains('c3'):
                carLeft.classList.remove('c3');
                carLeft.classList.add('c1');
                break
        }
    }
    //move cars right
    function moveCarRight(carRight) {
        switch (true) {
            case carRight.classList.contains('c1'):
                carRight.classList.remove('c1');
                carRight.classList.add('c3');
                break
            case carRight.classList.contains('c2'):
                carRight.classList.remove('c2');
                carRight.classList.add('c1');
                break
            case carRight.classList.contains('c3'):
                carRight.classList.remove('c3');
                carRight.classList.add('c2');
                break
        }
    }

    //move logs left
    function moveLogLeft(logLeft) {
        switch (true) {
            case logLeft.classList.contains('l1'):
                logLeft.classList.remove('l1');
                logLeft.classList.add('l2');
                break
            case logLeft.classList.contains('l2'):
                logLeft.classList.remove('l2');
                logLeft.classList.add('l3');
                break
            case logLeft.classList.contains('l3'):
                logLeft.classList.remove('l3');
                logLeft.classList.add('l4');
                break
            case logLeft.classList.contains('l4'):
                logLeft.classList.remove('l4');
                logLeft.classList.add('l5');
                break
            case logLeft.classList.contains('l5'):
                logLeft.classList.remove('l5');
                logLeft.classList.add('l1');
                break
        }
    }

    //move logs right
    function moveLogRight(logRight) {
        switch (true) {
            case logRight.classList.contains('l1'):
                logRight.classList.remove('l1');
                logRight.classList.add('l5');
                break
            case logRight.classList.contains('l2'):
                logRight.classList.remove('l2');
                logRight.classList.add('l1');
                break
            case logRight.classList.contains('l3'):
                logRight.classList.remove('l3');
                logRight.classList.add('l2');
                break
            case logRight.classList.contains('l4'):
                logRight.classList.remove('l4');
                logRight.classList.add('l3');
                break
            case logRight.classList.contains('l5'):
                logRight.classList.remove('l5');
                logRight.classList.add('l4');
                break
        }
    }



    //win -- vitoria
    function win() {
        if (squares[4].classList.contains('frog')) {
            result.innerHTML = 'You Win!!';
            clearInterval(timerId);
            document.removeEventListener('keyup', moveFrog)
        }
    }

    //lose - derrota
    function lose() {
        if ((currentTime === 0) || (squares[currentIndex].classList.contains('c1'))
            || (squares[currentIndex].classList.contains('l4'))
            || (squares[currentIndex].classList.contains('l5'))) {
            result.innerHTML = 'You Lose!';
            squares[currentIndex].classList.remove('frog');
            squares[currentIndex].classList.add('lose');
            clearInterval(timerId);
            document.removeEventListener('keyup', moveFrog);
        }
    }


    //move frog along with the log -- move o sapo junto a madeira
    function moveWithLogLeft() {
        if (currentIndex >= 27 && currentIndex < 35) {
            squares[currentIndex].classList.remove('frog')
            currentIndex += 1;
            squares[currentIndex].classList.add('frog');
        }
    }
    function moveWithLogRight() {
        if (currentIndex > 18 && currentIndex <= 26) {
            squares[currentIndex].classList.remove('frog')
            currentIndex -= 1;
            squares[currentIndex].classList.add('frog');
        }
    }

    //funtion to move everything that needs moving -- função para movimentar todos objetos que se movimentam
    function movePieces() {
        currentTime--
        timeLeft.innerHTML = currentTime;
        autoMoveCars();
        autoMoveLogs();
        moveWithLogLeft();
        moveWithLogRight();
        lose()
    }


    // start and pause the game -- começar e pausar o jogo
    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
        } else {
            timerId = setInterval(movePieces, 1000);
            document.addEventListener('keyup', moveFrog);
        }
    })


})