const headerEdit = document.querySelector(".headerEdit")
const btnEdit = document.querySelector(".boutonEdit")
const loginMail = document.querySelector(".loginmail")

const loginPassword = document.querySelector(".loginpassword")

const loginSubmit = document.querySelector(".loginsubmit")

loginSubmit.addEventListener("click", (event) => {
    event.preventDefault()
    if (loginPassword.value === "S0phie" && loginMail.value === "sophie.bluel@test.tld") {
        console.log("ça marche bien")
        window.location.href = "index.html";
        btnEdit.classList.add("disabled")
        headerEdit.classList.add("disabled")
    } else {
        alert("vous avez fais une erreur dans l'Email et/ou le Mot de passe")
    }
})

const lostPassword = document.querySelector(".lostPassword")
lostPassword.addEventListener("click", () => {
    alert("Veuillez contactez votre Administrateur")
})