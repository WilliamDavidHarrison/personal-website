const form = document.getElementById("contact-form");

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const message = document.getElementById("message");

const btn = document.getElementById("btn");

async function submitForm() {
    event.preventDefault();

    btn.setAttribute("disabled", true);
    btn.innerHTML = "Submitting...";

    fetch("https://n8n.hrsn.dev/webhook/71604b33-0b10-4104-bc1b-877c74d99fdb", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstname: firstName.value,
            lastname: lastName.value,
            email: email.value,
            message: message.value,
            "cf-turnstile-response": document.querySelector('input[name="cf-turnstile-response"]').value
        })
    }).then(res => res.json()).then(data => {
        form.reset();

        btn.removeAttribute("disabled");
        btn.innerHTML = "Submit";

        if([200, 400, 403, 429].includes(data.status)) {
            alert(data.message);
        } else {
            alert(`An error occurred, please try again.\nError: ${data.message}`);
        }
    })
}
