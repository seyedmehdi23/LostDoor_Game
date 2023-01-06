var DebugMode = true;

var debug_dialog = document.querySelector(".Debug-Dialog");
var debug_dialog_text = document.querySelector(".Debug-Dialog-text");

var debug_trigger_left_offset = pixelSize * 95;

// add function to another function

function DebugTriggerVisualization() {
    var map = document.querySelector(".map");
    for (let i = 0; i < triggers.length; i++) {
        const trigger = triggers[i];
        var element = document.createElement('div');
        element.classList.add("Debug-Trigger");
        element.classList.add("character");
        map.appendChild(element);
        element.style.transform = `translate3d( ${trigger.pos_x * pixelSize + debug_trigger_left_offset}px, ${trigger.pos_y * pixelSize + 50}px, 0 )`;
    }
}

function show_debug_dialog(msg) {
    debug_dialog_text.innerHTML = "DEBUG_MODE<br>" + msg;
    debug_dialog.style.display = "block";
}

function DebugPlayerInfo() {
    show_debug_dialog("PlayerX:" + player_x + " PlayerY:" + player_y);
}