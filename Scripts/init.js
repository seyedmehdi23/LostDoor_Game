
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
