function init() {
    draw();
}

// ========================================
// =================DRAWING================
// ========================================
player.locX = Math.floor(500 * Math.random() + 10);
player.locY = Math.floor(500 * Math.random() + 10);

let mousePosition = {
    x: player.locX,
    y: player.locY
};

function draw() {
    context.beginPath();
    context.fillStyle = "rgb(255,0,0)";

    playerMove();

    context.arc(player.locX, player.locY, 10, 0, 2 * Math.PI);
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = 'rgb(0,255,0)';
    context.stroke();
    requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', (event) => {
    // console.log(event)
    mousePosition = {
        x: event.clientX,
        y: event.clientY
    };
})

function playerMove() {

    speed = 10;
    const distX = mousePosition.x - player.locX;
    const distY = mousePosition.y - player.locY;
    const distAbs = Math.sqrt(distX * distX + distY * distY);

    let deltaX = speed * distX / distAbs;
    if (deltaX) player.locX += deltaX;

    let deltaY = speed * distY / distAbs;
    if (deltaY) player.locY += deltaY;

    if (player.locX < 5) player.locX = 5;
    if (player.locX > wWidth - 5) player.locX = wWidth - 5;
    if (player.locY < 5) player.locY = 5;
    if (player.locY > wHeight - 5) player.locY = wHeight - 5;
}

