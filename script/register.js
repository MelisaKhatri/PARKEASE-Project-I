function validateForm() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirm").value;
    let dob = document.getElementById("dob").value;

    if(password.length < 6){
        alert("Password must be at least 6 characters.");
        return false;
    }

    if(password !== confirm){
        alert("Passwords do not match.");
        return false;
    }

    let user = { 
        name: name,
        email: email,
        password: password,
        dob: dob
    };

    localStorage.setItem(email, JSON.stringify(user));

    alert("Registration successful!");

    window.location.href = "login.html";

    return false;
}