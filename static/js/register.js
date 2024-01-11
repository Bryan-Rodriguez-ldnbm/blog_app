document.addEventListener("DOMContentLoaded", () => {
    
    const username = document.getElementById("id_username");
    const email = document.getElementById("id_email");
    const password = document.getElementById("id_password1");
    const confirm_password = document.getElementById("id_password2")
    const show_password = document.getElementById("show_password");
    const register_btn = document.getElementById("form_btn");

    const fieldValid = new Map();

    fieldValid.set("user", false);
    fieldValid.set("email", false);
    fieldValid.set("length", false);
    fieldValid.set("number", false);
    fieldValid.set("special", false);
    fieldValid.set("lower-upper", false);
    fieldValid.set("match", false);

    username.addEventListener("blur", (event) => {
        event.preventDefault();

        const value = event.target.value;

        if (value > 0 && event.target.value.length < 4) {
            document.querySelector(".username-error").style.display = "block";
            document.querySelector(".username-error").textContent = "Username is too short";
            fieldValid.set("user", false)
        }
        else {
            document.querySelector(".username-error").style.display = "none";
            document.querySelector(".username-error").textContent = "";
            fieldValid.set("user", true);
        }

        fetch("/accounts/check_user", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "X-CSRFToken": csrf
            },
            body: JSON.stringify({ user: value }),
            mode: 'same-origin'
        }).then((response) => {
            if (response.ok) {
                fieldValid.set("user", true);
                document.querySelector(".username-error").style.display = "none";
                document.querySelector(".username-error").textContent = "";
            }
            else {
                document.querySelector(".username-error").style.display = "block";
                document.querySelector(".username-error").textContent = "User is taken";
            }
        }).catch((error) => {
            console.error("Error: ", error);
        });
    });

    email.addEventListener("blur", (event) => {
        event.preventDefault();
        
        const value = event.target.value;

        if (!value) {
            fieldValid.set("email", false)
            return;
        }
        if (!(/@/.test(value))) {
            document.querySelector(".email-error").style.display = "block";
            document.querySelector(".email-error").textContent = "Invalid email";
            fieldValid.set("email", false)
            return;
        }
        else {
            document.querySelector(".email-error").style.display = "none";
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
                fieldValid.set("email", true);
                document.querySelector(".email-error").style.display = "none";
                document.querySelector(".email-error").textContent = "";
            }
            else {
                document.querySelector(".email-error").style.display = "block";
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
            fieldValid.set(id, true);
        }
        else {
            requirement.classList.remove("valid");
            requirement.classList.add("invalid");
            fieldValid.set(id, false);
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

        let valid = true;

        for (const x of fieldValid.values()) {
            if (x == false) valid = false;
        }

        if (valid) {
            document.getElementById("register_form").submit();
        }
        else {
            console.log("Error submitting form");
        }
    });
});