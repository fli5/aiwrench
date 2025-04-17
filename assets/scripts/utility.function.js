function navigateToUrl() {
    window.open("https://1.aibanshou.com", "_blank");
}

function load() {
    document.getElementById("free-trial").addEventListener("click", navigateToUrl);
}

document.addEventListener("DOMContentLoaded", load);