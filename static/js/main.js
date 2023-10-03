const root = document.documentElement;
const logoImg = document.getElementById("logo-img");
const toggleSwitch = document.getElementById("toggleSwitch");

toggleSwitch.addEventListener("change", () => {
    if (!toggleSwitch.checked) {
        root.style.setProperty('--background', '#FAFAFA');
        root.style.setProperty('--text', 'black');
        logoImg.src = "static/images/logo-light.png";
    }
    else {
        root.style.setProperty('--background', 'rgb(23,23,23)');
        root.style.setProperty('--text', 'white');
        logoImg.src = "static/images/logo-dark.png";
    }
});