
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

    //reset the translation back to default
    context.setTransform(1, 0, 0, 1, 0, 0)

    //clear the screen out so the old stuff is gone form the last frame
    context.clearRect(0, 0, canvas.width, canvas.height);

    //clamp the camera to the player
    const camX = -player.locX + canvas.width / 2;
    const camY = -player.locY + canvas.height / 2;
    //translate allows us to move the canvass around
    context.translate(camX, camY)

    context.beginPath();
    context.fillStyle = "rgb(255,0,0)";

    playerMove();

    context.arc(player.locX, player.locY, 10, 0, 2 * Math.PI);
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = 'rgb(0,255,0)';
    context.stroke();

    drawOrbs();

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
    const distX = mousePosition.x - canvas.width / 2;
    const distY = mousePosition.y - canvas.height / 2;
    const distAbs = Math.sqrt(distX * distX + distY * distY);

    let deltaX = speed * distX / distAbs;
    if (deltaX) player.locX += deltaX;

    let deltaY = speed * distY / distAbs;
    if (deltaY) player.locY += deltaY;

    if (player.locX < 5) player.locX = 5;
    if (player.locX > 500 - 5) player.locX = 500 - 5;
    if (player.locY < 5) player.locY = 5;
    if (player.locY > 500 - 5) player.locY = 500 - 5;
}

function drawOrbs() {
    orbs.forEach(orb => drawOrb(orb));
}

function drawOrb(orb) {
    context.beginPath();
    context.fillStyle = orb.color;
    context.arc(orb.locX, orb.locY, orb.radius, 0, 2 * Math.PI);
    context.fill();
    // context.lineWidth = 1;
    // context.strokeStyle = 'rgb(0,255,0)';
    // context.stroke();
}
