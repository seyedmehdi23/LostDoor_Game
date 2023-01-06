var player = document.querySelector("#KeLier");
var map = document.querySelector(".map");

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

const frame_handler = () => {
    Update();
    placePlayer();
    
    if (debug_mode)
        load_DebugTools();

        var player_data = { x: player_x, y: player_y };
        var trigger_action = trigger_recognize(player_data);
        if (typeof trigger_action !== 'undefined')
            eval(trigger_action);
        
    window.requestAnimationFrame(() => {
        frame_handler();
    })
}

Start(); // First Frame Call
frame_handler(); // Every Frame Call
