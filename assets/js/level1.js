
// If this level have trigger this variable must be true
var have_trigger = true;

// list of triggers (variable name is not matter but in check_triggers function this variables must be called and handled)
var trigger_1 = { pos_x: -63, pos_y: 33, msg: "یه کلید شکسته", one_time_use: false, lock: false };
var trigger_2 = { pos_x: 50, pos_y: 100, action: "console.log('boz')", one_time_use: true, lock: false };

// ToDo: create Stateless trigger handler
// ToDo: functional trigger action

function check_triggers(player_data) {
    var trigger = undefined;
    if (is_trigger(player_data, trigger_1)) if (!trigger_1.lock) trigger = trigger_1;
    if (is_trigger(player_data, trigger_2)) if (!trigger_2.lock) trigger = trigger_2;
    return trigger;
}

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
