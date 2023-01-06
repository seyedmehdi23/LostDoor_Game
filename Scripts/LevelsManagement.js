function LoadLevel(level_name) {
    var fadePanel = document.querySelector(".Fade-Panel");
    fadePanel.classList.add("FadeOut-Panel");
    setTimeout(function() {
        document.location.href = "Levels/" + level_name;
    }, 1000);
}