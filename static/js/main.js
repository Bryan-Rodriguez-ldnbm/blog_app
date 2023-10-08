const root = document.documentElement;
const logoImg = document.getElementById("logo-img");
const toggleSwitch = document.getElementById("toggleSwitch");

toggleSwitch.addEventListener("change", () => {
    if (!toggleSwitch.checked) {
        root.style.setProperty('--background', '#FAFAFA');
        root.style.setProperty('--text', 'black');
        root.style.setProperty('--box-shadow', 'rgb(0,0,0, 0.1)')
        logoImg.src = "/static/images/logo-light.png";
    }
    else {
        root.style.setProperty('--background', 'rgb(23,23,23)');
        root.style.setProperty('--text', 'white');
        root.style.setProperty('--box-shadow', 'rgb(0,0,0, 0.9)')
        logoImg.src = "/static/images/logo-dark.png";
    }
});