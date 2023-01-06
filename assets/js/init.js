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

var pixelSize = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
);


var playerSpawn_x = 0;
var PlayerSpawn_y = 50;

var map_padding_x = 0;
var map_padding_y = 0;

function placeCharacter(character, x, y) {
    character.setAttribute("walking", "false");
    character.style.transform = `translate3d( ${pixelSize + x}px, ${pixelSize * y}px, 0 )`;
}

var trigger_offset = 10;
function is_trigger(player_data, trigger_data) {
    var player_x = player_data.x;
    var player_y = player_data.y;
    var x_pos = trigger_data.pos_x;
    var y_pos = trigger_data.pos_y;
    var x_trigger = player_x >= x_pos - trigger_offset && player_x <= x_pos + trigger_offset;
    var y_trigger = player_y >= y_pos - trigger_offset && player_y <= y_pos + trigger_offset;
    return x_trigger && y_trigger;
}