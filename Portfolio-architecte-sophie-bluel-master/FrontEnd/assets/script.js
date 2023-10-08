
const apiWorks = "http://localhost:5678/api/works"
const apiCategory = "http://localhost:5678/api/categories"


let projets = []
let category = 0
let categoryData = []
// on récupére données de l'API Works

fetch(apiWorks)
    .then(reponse => {
        if (!reponse.ok) {
            throw new Error(`Erreur HTTP! statut: ${reponse.status}`)
        }
        return reponse.json();
    })
    .then(data => {
        projets = data
        mesProjets()

    })
    .catch(error => {
        console.error("Une erreur s'est produite lors de la récupération des données", error);

    })


// on récupére données de l'API Categories

fetch(apiCategory)
    .then(reponse => {
        if (!reponse.ok) {
            throw new Error(`Erreur HTTP! statut: ${reponse.status}`)
        }
        return reponse.json();
    })
    .then(data => {
        categoryData = data
        createButton()

    })
    .catch(error => {
        console.error("Une erreur s'est produite lors de la récupération des données", error);

    })


// on génére les projets
const gallery = document.querySelector(".gallery")

function mesProjets() {
    gallery.innerHTML = ""
    for (let i = 0; i < projets.length; i++) {
        if (category === projets[i].categoryId || category === 0) {
            const article = projets[i];
            const projet = document.createElement("figure")
            const imageProjet = document.createElement("img")
            imageProjet.src = article.imageUrl;
            imageProjet.alt = article.title;
            const textProjet = document.createElement("figcaption")
            textProjet.innerText = article.title

            // On rattache les balises a la section gallery

            gallery.appendChild(projet);
            projet.appendChild(imageProjet);
            projet.appendChild(textProjet);

        }
    }
}

// on génére les boutons
const divFiltres = document.querySelector(".filtres")

function createButton() {
    for (let index = 0; index < categoryData.length; index++) {
        const bouton = categoryData[index]
        const boutonFiltres = document.createElement('button')
        boutonFiltres.classList.add("filtres-boutton")

        // on génére le nom des boutons 

        boutonFiltres.innerText = `${bouton.name}`

        // on ajoute un EventListener sur la boucle des boutons

        boutonFiltres.addEventListener("click", () => {
            console.log("ça marche")
            category = bouton.id
            mesProjets()
        })

        // On rattache les balises a la section filtres

        divFiltres.appendChild(boutonFiltres)
        console.log(bouton)
    }
}

//gestion du boutton tous 

const boutonTous = document.getElementById("tous")
boutonTous.addEventListener("click", function () {
    category = 0;
    mesProjets()
})


//mode édition

const introduction = document.getElementById("introduction")
const portFolio = document.getElementById("portfolio")

function createButtonEdit() {
    const boutonEdition = document.createElement("button")
    boutonEdition.innerText = "Edition";
    boutonEdition.classList.add("filtres-boutton")
}

// boutonEdition.appendChild(portFolio)

// afficher mode édition 

function afficherPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    // La popup est masquée par défaut (display:none), ajouter la classe "active"
    // va changer son display et la rendre visible. 
    popupBackground.classList.add("active")
}

/**
 * Cette fonction cache la popup pour partager son score. 
 */
function cacherPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    // La popup est masquée par défaut (display:none), supprimer la classe "active"
    // va rétablir cet affichage par défaut. 
    popupBackground.classList.remove("active")
}
/**
 * Cette fonction initialise les écouteurs d'événements qui concernent 
 * l'affichage de la popup. 
 */
function initAddEventListenerPopup() {
    // On écoute le click sur le bouton "partager"
    btnEdit = document.querySelector(".boutonEdition")
    let popupBackground = document.querySelector(".popupBackground")
    btnEdit.addEventListener("click", () => {
        // Quand on a cliqué sur le bouton partagé, on affiche la popup
        afficherPopup()
    })

    // On écoute le click sur la div "popupBackground"
    popupBackground.addEventListener("click", (event) => {
        // Si on a cliqué précisément sur la popupBackground 
        // (et pas un autre élément qui se trouve dedant)
        if (event.target === popupBackground) {
            // Alors on cache la popup
            cacherPopup()
        }
    })
}
initAddEventListenerPopup()