const root = document.documentElement;
const toggleSwitch = document.getElementById("toggleSwitch");

function setMode(mode) {
    localStorage.setItem('UserModePref', mode);
}

function getMode() {
    const mode = localStorage.getItem('UserModePref')
    if (mode === 'dark') {
        setDarkMode();
    }
    else {
        setLightMode();
    }
}

function setLightMode() {
    root.style.setProperty('--background', '#FAFAFA');
    root.style.setProperty('--text', 'black');
    root.style.setProperty('--box-shadow', 'rgb(0,0,0, 0.1)')
    root.style.setProperty('--hover-fill', 'lightblue')
    setMode('white');
    toggleSwitch.checked = false;
}

function setDarkMode() {
    root.style.setProperty('--background', 'rgb(23,23,23)');
    root.style.setProperty('--text', 'white');
    root.style.setProperty('--box-shadow', 'rgb(0,0,0, 0.3)')
    root.style.setProperty('--hover-fill', 'dimgray')
    setMode('dark');
    toggleSwitch.checked = true;
}

toggleSwitch.addEventListener("change", () => {
    if (!toggleSwitch.checked) {
        setLightMode();
    }
    else {
        setDarkMode();
    }
});

getMode();