var character = document.querySelector(".character");
var map = document.querySelector(".map");
var intract_dialog = document.querySelector(".intract_dialog");
var intract_dialog_text = document.querySelector(".intract_dialog_text");

var debug_dialog = document.querySelector(".debug_dialog");
var debug_dialog_text = document.querySelector(".debug_dialog_text");

//start in the middle of the map
var x = 0;
var y = 50;
var held_directions = []; //State of which arrow keys we are holding down
var speed = 1; //How fast the character moves in pixels per frame
var trigger_offset = 10;

const placeCharacter = () => {

    var pixelSize = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
    );

    const held_direction = held_directions[0];
    if (held_direction) {
        if (held_direction === directions.right) { x += speed; }
        if (held_direction === directions.left) { x -= speed; }
        if (held_direction === directions.down) { y += speed; }
        if (held_direction === directions.up) { y -= speed; }
        character.setAttribute("facing", held_direction);
    }
    character.setAttribute("walking", held_direction ? "true" : "false");

    //Limits (gives the illusion of walls)
    var leftLimit = -95;
    var rightLimit = (16 * 6);
    var topLimit = -8 + 32;
    var bottomLimit = (16 * 7);
    if (x < leftLimit) { x = leftLimit; }
    if (x > rightLimit) { x = rightLimit; }
    if (y < topLimit) { y = topLimit; }
    if (y > bottomLimit) { y = bottomLimit; }

    show_debug_dialog("PlayerX:"+x + " PlayerY:"+y);
    if (typeof triggers !== 'undefined') {
        var player_data = { x: x, y: y };
        // if (is_trigger(x,y, trigger.pos_x, trigger.pos_y))
        trigger = check_triggers(player_data);
        // console.log(trigger);
        if (typeof trigger !== 'undefined') {
            if (typeof trigger.msg !== 'undefined') {
                show_intract_dialog(trigger.msg);
            }
            if (typeof trigger.action !== 'undefined') {
                eval(trigger.action);
                if (trigger.one_time_use)
                    trigger.lock = true;
            }
        } else {
            hide_intract_dialog();
        }
        // for (let i = 0; i < triggers.length; i++) {
        //     let trigger = triggers[i];
        // }
    }


    var camera_left = pixelSize * 66;
    var camera_top = pixelSize * 42;

    var character_left = pixelSize * 88;

    map.style.transform = `translate3d( ${-x * pixelSize + camera_left}px, ${-y * pixelSize + camera_top}px, 0 )`;
    character.style.transform = `translate3d( ${x * pixelSize + character_left}px, ${y * pixelSize}px, 0 )`;
}

function show_intract_dialog(msg) {
    intract_dialog_text.innerText = msg;
    intract_dialog.style.display = "block";
}

function hide_intract_dialog() {
    intract_dialog.style.display = "none";
}

function show_debug_dialog(msg) {
    debug_dialog_text.innerHTML = "DEBUG_MODE<br>"+msg;
    debug_dialog.style.display = "block";
}

//Set up the game loop
const step = () => {
    placeCharacter();
    window.requestAnimationFrame(() => {
        step();
    })
}
step(); //kick off the first step!



/* Direction key state */
const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
}
const keys = {
    38: directions.up,
    37: directions.left,
    39: directions.right,
    40: directions.down,
}
document.addEventListener("keydown", (e) => {
    var dir = keys[e.which];
    if (dir && held_directions.indexOf(dir) === -1) {
        held_directions.unshift(dir)
    }
})

document.addEventListener("keyup", (e) => {
    var dir = keys[e.which];
    var index = held_directions.indexOf(dir);
    if (index > -1) {
        held_directions.splice(index, 1)
    }
});



/* BONUS! Dpad functionality for mouse and touch */
var isPressed = false;
const removePressedAll = () => {
    document.querySelectorAll(".dpad-button").forEach(d => {
        d.classList.remove("pressed")
    })
}
document.body.addEventListener("mousedown", () => {
    console.log('mouse is down')
    isPressed = true;
})
document.body.addEventListener("mouseup", () => {
    console.log('mouse is up')
    isPressed = false;
    held_directions = [];
    removePressedAll();
})
const handleDpadPress = (direction, click) => {
    if (click) {
        isPressed = true;
    }
    held_directions = (isPressed) ? [direction] : []

    if (isPressed) {
        removePressedAll();
        document.querySelector(".dpad-" + direction).classList.add("pressed");
    }
}
//Bind a ton of events for the dpad
document.querySelector(".dpad-left").addEventListener("touchstart", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("touchstart", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("touchstart", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("touchstart", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mousedown", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("mousedown", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("mousedown", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("mousedown", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mouseover", (e) => handleDpadPress(directions.left));
document.querySelector(".dpad-up").addEventListener("mouseover", (e) => handleDpadPress(directions.up));
document.querySelector(".dpad-right").addEventListener("mouseover", (e) => handleDpadPress(directions.right));
document.querySelector(".dpad-down").addEventListener("mouseover", (e) => handleDpadPress(directions.down));

