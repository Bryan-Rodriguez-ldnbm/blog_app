document.addEventListener("DOMContentLoaded", () => {
    
    const username = document.getElementById("id_username");
    const email = document.getElementById("id_email");
    const password = document.getElementById("id_password");
    const confirm_password = document.getElementById("id_confirm_password")
    const show_password = document.getElementById("show_password");
    const register_btn = document.getElementById("submit-btn");

    const fieldsValid = new Map();

    fieldsValid.set("user", false);
    fieldsValid.set("email", false);
    fieldsValid.set("length", false);
    fieldsValid.set("number", false);
    fieldsValid.set("special", false);
    fieldsValid.set("lower-upper", false);
    fieldsValid.set("match", false);

    username.addEventListener("blur", (event) => {
        if (event.target.value.length > 0 && event.target.value.length < 4) {
            document.querySelector(".username-error").textContent = "Username is too short";
            fieldsValid.set("user", false)
        }
        else {
            document.querySelector(".username-error").textContent = "";
            fieldsValid.set("user", true);
        }
    });

    email.addEventListener("blur", (event) => {
        event.preventDefault();
        
        const value = event.target.value;

        if (!value) {
            fieldsValid.set("email", false)
            return;
        }
        if (!(/@/.test(value))) {
            document.querySelector(".email-error").textContent = "Invalid email";
            fieldsValid.set("email", false)
            return;
        }
        else {
            document.querySelector(".email-error").textContent = "";
        }

        fetch("/accounts/check_email/", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "X-CSRFToken": csrf
            },
            body: JSON.stringify({ email: value }),
            mode: 'same-origin'
        }).then((response) => {
            if (response.ok) {
                fieldsValid.set("email", true);
                document.querySelector(".email-error").textContent = "";
            }
            else {
                document.querySelector(".email-error").textContent = "Email is taken";
            }
        }).catch((error) => {
            console.error("Error: ", error);
        });
    });
    
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
    });

    function updateRequirement(id, valid) {
        const requirement = document.getElementById(id);

        if (valid) {
            requirement.classList.remove("invalid");
            requirement.classList.add("valid");
            fieldsValid.set(id, true);
        }
        else {
            requirement.classList.remove("valid");
            requirement.classList.add("invalid");
            fieldsValid.set(id, false);
        }
    }

    password.addEventListener("input", (event) => {
        const value = event.target.value;

        updateRequirement("length", value.length >= 8);
        updateRequirement("number", /\d/.test(value));
        updateRequirement("special", /[!@#$%^&*()]/.test(value));
        updateRequirement("lower-upper", /[A-Z]/.test(value) && /[a-z]/.test(value));
    });

    confirm_password.addEventListener("input", (event) => {
        const value = event.target.value;

        updateRequirement("match", value.length > 0 && value == password.value);
    });

    register_btn.addEventListener("click", (event) => {
        event.preventDefault();

    });
});