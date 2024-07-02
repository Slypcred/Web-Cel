const sendBtn = document.getElementById("btn-contact");
const inputName = document.getElementById("input-name");
const inputEmail = document.getElementById("input-email");
const diag = document.getElementById("diag");


const sendContact = (e) => {
    e.preventDefault();
    let valid = true
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (inputName.value.length < 4) {
        alert("The name is empty or too short")
        valid = false
    }
    if (!validRegex.test(inputEmail.value)) {
        alert("The email is empty or invalid")
        valid = false
    }
    if (diag.value.length < 10) {
        alert("The comment is empty or very short")
        valid = false
    }
    if (valid) {
        alert("Your comment was sent successfully")
        inputName.value = "";
        inputEmail.value = "";
        diag.value = "";
    }
}


export const contactInit = () => {
    sendBtn.addEventListener("click", sendContact)
}