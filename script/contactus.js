document.getElementById("contactForm").addEventListener("submit", function(e){

    e.preventDefault();

    const contact = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
        date: new Date().toLocaleString()
    };

    let messages =
        JSON.parse(localStorage.getItem("messages")) || [];

    messages.push(contact);

    localStorage.setItem(
        "messages",
        JSON.stringify(messages)
    );

    alert("Message sent successfully!");

    this.reset();

});