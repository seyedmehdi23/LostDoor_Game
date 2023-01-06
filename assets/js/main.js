var player = document.querySelector("#KeLier");
var map = document.querySelector(".map");
var intract_dialog = document.querySelector(".intract_dialog");
var intract_dialog_text = document.querySelector(".intract_dialog_text");

// ToDo: Create UnDependence Player Module

// start in the middle of the map
var player_x = playerSpawn_x;
var player_y = PlayerSpawn_y;
var held_directions = []; // State of which arrow keys we are holding down
var speed = 1; // How fast the character moves in pixels per frame
player.style.zIndex = "10";

const placePlayer = () => {

    const held_direction = held_directions[0];
    if (held_direction) {
        if (held_direction === directions.right) { player_x += speed; }
        if (held_direction === directions.left) { player_x -= speed; }
        if (held_direction === directions.down) { player_y += speed; }
        if (held_direction === directions.up) { player_y -= speed; }
        player.setAttribute("facing", held_direction);
    }
    player.setAttribute("walking", held_direction ? "true" : "false");

    // Limits (gives the illusion of walls)
    // ToDo: Map Limit Define By Level Script
    var leftLimit = -95 + map_padding_x;
    var rightLimit = (16 * 6) - map_padding_x;
    var topLimit = -8 + 32 + map_padding_y;
    var bottomLimit = (16 * 7) - map_padding_y;
    if (player_x < leftLimit) { player_x = leftLimit; }
    if (player_x > rightLimit) { player_x = rightLimit; }
    if (player_y < topLimit) { player_y = topLimit; }
    if (player_y > bottomLimit) { player_y = bottomLimit; }

    // Unstable Feature: Place Player in Center of Camera View (Camera Follow Needed!)
    var camera_left = pixelSize * 66;
    var camera_top = pixelSize * 42;
    var player_left_offset = pixelSize * 88;

    map.style.transform = `translate3d( ${-player_x * pixelSize + camera_left}px, ${-player_y * pixelSize + camera_top}px, 0 )`;
    player.style.transform = `translate3d( ${player_x * pixelSize + player_left_offset}px, ${player_y * pixelSize}px, 0 )`;
}

function show_intract_dialog(msg) {
    intract_dialog_text.innerText = msg;
    intract_dialog.style.display = "block";
}

function hide_intract_dialog() {
    intract_dialog.style.display = "none";
}

// Set up the game loop
const frame_handler = () => {
    Update();
    placePlayer();
    if (debug_mode)
        load_DebugTools();

    // ToDo: Create UnDependence Trigger Module
    if (typeof have_trigger != 'undefined' && have_trigger == true) {
        var player_data = { x: player_x, y: player_y };
        trigger = check_triggers(player_data);
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
    }
    window.requestAnimationFrame(() => {
        frame_handler();
    })
}

Start(); // First Frame Call
frame_handler(); // Every Frame Call

// ToDo: Create UnDependence Controller Module

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

// Bind a ton of events for the dpad
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
