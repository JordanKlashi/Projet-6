
const loginSubmit = document.querySelector(".loginsubmit")

loginSubmit.addEventListener("click", (event) => {
    event.preventDefault()
    const loginMail = document.getElementById("loginmail")
    const loginPassword = document.getElementById("password")

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginMail.value,
          password: loginPassword.value,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.userId) {
            localStorage.setItem("info", JSON.stringify(response));
            document.location.href = "/";
          } else if (response.message) {
            alert("Mail  invalide");
          } else {
            alert("Mot de passe invalide");
          }
        })
        .catch(function (err) {
          console.log(err);
          alert("Veuillez nous excuser Erreur System ");
        });
})

const lostPassword = document.querySelector(".lostPassword")
lostPassword.addEventListener("click", () => {
    alert("Veuillez contactez votre Administrateur")
})