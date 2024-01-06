document.addEventListener("DOMContentLoaded", () => {
    
    const username = document.getElementById("id_username");
    const email = document.getElementById("id_email");
    const password = document.getElementById("id_password");
    const confirm_password = document.getElementById("id_confirm_password")
    const show_password = document.getElementById("show_password");

    username.addEventListener("blur", (event) => {
        if (event.target.value.length > 0 && event.target.value.length < 4) {
            document.querySelector(".username-error").textContent = "Username is too short";
        }
        else {
            document.querySelector(".username-error").textContent = "";
        }
    })
    
    show_password.addEventListener("click", (event) => {
        if (password.type == "password") {
            password.type = "text";
            confirm_password.type = "text";
            show_password.textContent = "Hide Password";
        }
        else {
            password.type = "password";
            confirm_password.type = "password";
            show_password.textContent = "Show Password";
        }
    })

    function updateRequirement(id, valid) {
        const requirement = document.getElementById(id);

        if (valid) {
            requirement.classList.remove("invalid");
            requirement.classList.add("valid");
        }
        else {
            requirement.classList.add("invalid");
        }
    }

    password.addEventListener("input", (event) => {
        const value = event.target.value;

        updateRequirement("length", value.length >= 8);
        updateRequirement("number", /\d/.test(value));
        updateRequirement("special", /[!@#$%^&*()]/.test(value));
        updateRequirement("lower-upper", );
        updateRequirement("match", );
    })
});