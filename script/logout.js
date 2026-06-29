function logout() {
    let confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {
        localStorage.removeItem("loggedIn");
        alert("You have been logged out successfully.");
        window.location.href = "../html/login.html";
    }
}