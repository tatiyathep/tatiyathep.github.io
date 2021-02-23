(() => {
    function setup() {
        const canvas = document.getElementById('falling-snow-canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        return {
            canvas,
            canvasContext: canvas.getContext('2d'),
            numberOfSnowBalls: 250
        }
    }

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function createSnowBalls(canvas, numberOfSnowBalls) {
        return [...Array(numberOfSnowBalls)].map(() => {
            return {
                x: random(0, canvas.width),
                y: random(0, canvas.height),
                opacity: random(0.5, 1),
                radius: random(2, 4),
                speedX: random(-5, 5),
                speedY: random(1, 3),
                colorA: random(0, 255),
                colorB: random(0, 255),
                colorC: random(0, 255)
            }
        });
    }

    function drawSnowBall(canvasContext, snowBall) {
        canvasContext.beginPath();
        canvasContext.arc(snowBall.x, snowBall.y, snowBall.opacity, 0, Math.PI * 2);
        canvasContext.fillStyle = `rgba(${snowBall.colorA}, ${snowBall.colorC}, ${snowBall.colorC}, ${snowBall.radius})`;
        canvasContext.fill();
    }

    function moveSnowBall(canvas, snowBall) {
        snowBall.x += snowBall.speedX;
        snowBall.y += snowBall.speedY;

        if (snowBall.x > canvas.width) {
            snowBall.x = 0;
        } else if (snowBall.x < 0) {
            snowBall.x = canvas.width;
        }

        if (snowBall.y > canvas.height) {
            snowBall.y = 0;
        }
    }

    function run() {
        const { canvas, canvasContext, numberOfSnowBalls } = setup();
        const snowBalls = createSnowBalls(canvas, numberOfSnowBalls);

        setInterval(() => {
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            snowBalls.forEach((snowBalls) => drawSnowBall(canvasContext, snowBalls));
            snowBalls.forEach((snowBalls) => moveSnowBall(canvas, snowBalls));
        }, 50);

    }
    run();
})();