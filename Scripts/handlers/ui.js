var intract_dialog = document.querySelector(".Intract-Dialog");
var intract_dialog_text = document.querySelector(".Intract-Dialog-text");
var intract_dialog_visible = false;

function show_intract_dialog(msg) {
    intract_dialog_text.innerText = msg;
    intract_dialog.style.display = "block";
    intract_dialog_visible = true;
}
    
function hide_intract_dialog() {
    intract_dialog.style.display = "none";
}