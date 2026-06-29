function login(event){

    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let user = JSON.parse(localStorage.getItem(email));

    if(user && user.password === password){

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", email);

        window.location.href = "../index.html";
    }
    else{
        alert("Invalid Email or Password");
    }
}