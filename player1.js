var ball1, ball2;
var database;
var ballPosition1, ballPosition2;
var pos1, pos2;

function setup() {
    createCanvas(500, 600);
    ball1 = createSprite(250, 250, 10, 10);
    ball1.shapeColor = "red";

    ball2 = createSprite(250, 250, 10, 10);
    ball2.shapeColor = "purple";

    database = firebase.database();

    ballPosition1 = database.ref("ball/position");
    ballPosition1.on("value", readValue1, showError1);

    ballPosition2 = database.ref("ball2/position");
    ballPosition2.on("value", readValue2, showError2);
}

function draw() {
    background("white");
    if (keyDown(LEFT_ARROW)) {
        writePosition(-2, 0);
    }

    if (keyDown(RIGHT_ARROW)) {
        writePosition(2, 0);
    }

    if (keyDown(UP_ARROW)) {
        writePosition(0, -2);
    }

    if (keyDown(DOWN_ARROW)) {
        writePosition(0, +2);
    }
    drawSprites();

    push();
    fill(0);
    textSize(15);
    text("YOU", ball1.x - 15, ball1.y - 20);
    text("OPPONENT", ball2.x - 40, ball2.y - 20);
    pop();

    ball2.collide(ball1);
    ball1.collide(ball2);

}

function writePosition(x, y) {
    if (pos1) {
        database.ref("ball/position").set({
            x: pos1.x + x,
            y: pos1.y + y
        })
    }
}

function readValue1(data) {
    pos1 = data.val();
    ball1.x = pos1.x;
    ball1.y = pos1.y;
}

function showError1(err1) {
    console.log(err1);
}

function readValue2(data) {
    
    pos2 = data.val();
    ball2.x = pos2.x;
    ball2.y = pos2.y;

}

function showError2(err2) {
    console.log(err2);
}


