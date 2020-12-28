function renderGame(server) {
    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext("2d");
    var bird = new Image();
    var bg = new Image();
    var fg = new Image();
    var pipeUp = new Image();
    var pipeBottom = new Image();
    

    bird.src = "images/bird.png";
    bg.src = "images/bg.png";
    fg.src = "images/fg.png";
    pipeUp.src = "images/pipeUp.png";
    pipeBottom.src = "images/pipeBottom.png";

    // Звуковые файлы
    var gap = 90;

    // При нажатии на какую-либо кнопку
    document.addEventListener("keydown", moveUp);

    function moveUp() {
        yPos -= 25;
    }

    // Создание блоков
    var pipe = [];

    pipe[0] = {
        x: cvs.width,
        y: 0
    }

    var score = 0;
    // Позиция птички
    var xPos = 10;
    var yPos = 150;
    var grav = 1.5;

    async function draw() {
        ctx.drawImage(bg, 0, 0);

        for (var i = 0; i < pipe.length; i++) {
            ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

            pipe[i].x--;

            if (pipe[i].x == 125) {
                pipe.push({
                    x: cvs.width,
                    y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
                });
            }

            // Отслеживание прикосновений
            if (xPos + bird.width >= pipe[i].x
                && xPos <= pipe[i].x + pipeUp.width
                && (yPos <= pipe[i].y + pipeUp.height
                    || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
               // location.reload(); // Перезагрузка страницы
               const playGame = document.querySelector('#playGame');
               playGame.classList.remove('displayNone');
               cvs.classList.add('displayNone');

               let cur = document.getElementById('curNumber');
               cur.innerText = `${score}`;
               let best = document.getElementById('bestNumber');
               if(await server.getBestScore() == false) {
                  await server.setBestScore(score)
                  const BestScore = 0;
                  best.innerText = `${BestScore}`;
               } else if(score > await server.getBestScore()) {
                    await server.setBestScore(score);
                    const BestScore = await server.getBestScore();
                    best.innerText = `${BestScore}`;
               }
               else {
                const BestScore = await server.getBestScore();
                best.innerText = `${BestScore}`;
               }
               return;
            }

            if (pipe[i].x == 5) {
                score++;
            }
        }

        ctx.drawImage(fg, 0, cvs.height - fg.height);
        ctx.drawImage(bird, xPos, yPos);

        yPos += grav;

        ctx.fillStyle = "#000";
        ctx.font = "24px Verdana";
        ctx.fillText("Счет: " + score, 10, cvs.height - 20);
        cvs.classList.remove('displayNone');
        requestAnimationFrame(draw);
    }
    
    pipeBottom.onload = draw;
}
