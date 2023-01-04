var debug_mode = true;

var debug_dialog = document.querySelector(".debug_dialog");
var debug_dialog_text = document.querySelector(".debug_dialog_text");

function show_debug_dialog(msg) {
    debug_dialog_text.innerHTML = "DEBUG_MODE<br>" + msg;
    debug_dialog.style.display = "block";
}

function load_DebugTools() {
    show_debug_dialog("PlayerX:" + player_x + " PlayerY:" + player_y);
}