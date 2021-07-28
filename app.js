document.addEventListener('DOMContentLoaded', () => {

        const butterfly = document.querySelector('.butterfly');
        const gameDisplay = document.querySelector('.gameContainer');
        const sky = document.querySelector(".sky")

        let butterflyLeft = 225;
        let butterflyBottom = 300;
        let gravity = 3;
        let isGameOver = false;
        let score = '';

        function startGame() {
            butterflyBottom -= gravity; 
            butterfly.style.bottom = butterflyBottom + 'px'; 
            butterfly.style.left = butterflyLeft + 'px'; 
        }

        let gameTimerId = setInterval(startGame, 20);

        function control(e) {
            if (e.keyCode === 32) {
                jump()
            }
        }

        document.addEventListener('keyup', control);

        function jump() {
            if (butterflyBottom < 525) butterflyBottom += 50;
            butterfly.style.bottom = butterflyBottom + 'px';
        }

        function generateObstacle() {
            let obstacleBottom = 70;
            let obstacleLeft = 605;
            const gap = 300;

            const heightCount = 5;
            const heightMultiple = 75;
            let obstacleHeight = Math.floor(Math.random() * heightCount + 1) * heightMultiple;
            let topObstacleHeight = Math.floor(Math.random() * heightCount + 1) * heightMultiple;

            const obstacle = document.createElement('div');
            const topObstacle = document.createElement('div');

            if (!isGameOver) {
                obstacle.classList.add('obstacle');
                topObstacle.classList.add('topObstacle');
            }

            gameDisplay.appendChild(obstacle);
            gameDisplay.appendChild(topObstacle);

            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';

            obstacle.style.bottom = obstacleBottom + 'px';
            topObstacle.style.top = obstacleBottom - 70 + 'px';

       
            if (topObstacleHeight >= 300) {
                obstacle.style.height = obstacleHeight - gap + 'px';
                obstacleHeight = obstacleHeight - gap;
            } else {
                obstacle.style.height = obstacleHeight + 'px';
            }
        
            if (obstacleHeight >= 300){
                topObstacle.style.height = topObstacleHeight - gap + 'px';
                topObstacleHeight = topObstacleHeight - gap
            } else {
                topObstacle.style.height = topObstacleHeight + 'px'
            }  

            function moveObstacle() {
                if (!isGameOver) obstacleLeft -= 2;
                obstacle.style.left = obstacleLeft + 'px';
                topObstacle.style.left = obstacleLeft + 'px';

                if (obstacleLeft === -35) {
                    clearInterval(timerId)
                    gameDisplay.removeChild(obstacle)
                    gameDisplay.removeChild(topObstacle)
                }

                if (obstacleLeft <= 285 && obstacleLeft >= 215 && butterflyLeft === 225 && (butterflyBottom <= obstacleHeight + 15 || butterflyBottom >= (620 - topObstacleHeight)) || butterflyBottom <= 74) {
                    gameOver();
                    clearInterval(timerId);
                }

            }
       
            let timerId = setInterval(moveObstacle, 20);
            if (!isGameOver) setTimeout(generateObstacle, 3000);
        }

        generateObstacle()

        function gameOver() {
            clearInterval(gameTimerId);
            isGameOver = true;
            document.removeEventListener('keyup', control);

            // const playAgain = document.createElement('div');
            // playAgain.classList.add('playAgain');
            // sky.appendChild(playAgain);

            // const gameOverDisplay = document.createElement('p');
            // gameOverDisplay.classList.add('gameover');
            // const gameOverText = document.createTextNode('Game Over!');
            // gameOverDisplay.appendChild(gameOverText);
            // playAgain.appendChild(gameOverDisplay);

            // const scoreDisplay = document.createElement('p');
            // scoreDisplay.classList.add('score');
            // const scoreText = document.createTextNode('Score: ' + score);
            // scoreDisplay.appendChild(scoreText);
            // playAgain.appendChild(scoreDisplay);

            // const restartParagraph = document.createElement('p');
            // restartParagraph.classList.add('restartParagraph');
            // const restartText = document.createTextNode('Play Again?');

            // restartParagraph.appendChild(restartText);
            // playAgain.appendChild(restartParagraph);

            // restartParagraph.addEventListener('click', restartGame);
        }

})
