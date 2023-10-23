const islogin = () => {

    const rep = localStorage.getItem("info") ? true : false;

    return rep

    //return false or true
}
// on récupére le bouton login
const loginBtn = document.getElementById("Login")
const headerEdit = document.querySelector(".headerEdit")

// on récupére les boutons édition


if (islogin()) {

    const nav = document.querySelector(".nav")
    const logOutBtn = document.createElement("a")
    logOutBtn.href = "/index.html"
    logOutBtn.innerText = "logout"
    nav.appendChild(logOutBtn)
    loginBtn.classList.add("disabled")
    divFiltres.classList.add("disabled")

    logOutBtn.addEventListener("click", () => {
        localStorage.clear()
    })

}
else {
    loginBtn.classList.remove("disabled")
    btnEdit.classList.add("disabled")
    headerEdit.classList.add("disabled")
    btnEditIntro.classList.add("disabled")
}