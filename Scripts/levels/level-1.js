
var triggers = [
    { pos_x: -63, pos_y: 33, action: "show_intract_dialog('یه کلید شکسته')", one_time_use: false, lock: false },
    { pos_x: 50, pos_y: 100, action: "LoadLevel('level_2.html')", one_time_use: true, lock: false }
];

function Start() {

    var KeLooker = document.querySelector("#KeLooker");
    placeCharacter(KeLooker, 300, 30);

    var Keeper = document.querySelector("#Keeper");
    placeCharacter(Keeper, 0, 30);

    playerSpawn_x = 0;
    PlayerSpawn_y = 50;    

    map_padding_x = 5;
    map_padding_y = 10;
}

function Update() {

}
