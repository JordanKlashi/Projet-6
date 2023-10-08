
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
        modeEditionPhotos()

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

// on génére l'API Delete


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



// boutonEdition.appendChild(portFolio)

// afficher mode édition 

let popupBackground = document.querySelector(".popupBackground")
let cross = document.querySelector(".cross")
const popup = document.querySelector(".popup")

function afficherPopup() {
    // La popup est masquée par défaut (display:none), ajouter la classe "active"
    // va changer son display et la rendre visible. 
    popupBackground.classList.add("active")
}

/**
 * Cette fonction cache la popup pour éditer. 
 */
function cacherPopup() {
    // La popup est masquée par défaut (display:none), supprimer la classe "active"
    // va rétablir cet affichage par défaut. 
    popupBackground.classList.remove("active")
}
/**
 * Cette fonction initialise les écouteurs d'événements qui concernent 
 * l'affichage de la popup. 
 */
function initAddEventListenerPopup() {
    // On écoute le click sur le bouton "Editer"
    btnEdit = document.querySelector(".boutonEdition")
    btnEdit.addEventListener("click", () => {
        // Quand on a cliqué sur le bouton Editer, on affiche la popup
        afficherPopup()
        modeEditionPhotos()
    })

    // On écoute le click sur la croix
    cross.addEventListener("click", () => {
        cacherPopup()
    })
}

initAddEventListenerPopup()

// on génére les photos dans le mode edit 

const galleryEdit = document.querySelector(".popup-galerie")
const popupTitre = document.querySelector(".popup-titre")



function modeEditionPhotos() {
    galleryEdit.innerHTML = ""
    for (let i = 0; i < projets.length; i++) {

        const photos = projets[i]

        const galleryEditPhotos = document.createElement("figure")
        const galleryPhotos = document.createElement("img")

        const photosDelete = document.createElement("button")
        photosDelete.classList.add("boutton-effacer")
        photosDelete.innerText = "supprimer"


        galleryPhotos.src = photos.imageUrl


        galleryEdit.appendChild(galleryEditPhotos)
        galleryEditPhotos.appendChild(galleryPhotos)
        galleryEditPhotos.appendChild(photosDelete)
        
    }
    popupTitre.innerText = "Galerie photos"
    bouttonAddPhotos.classList.remove("disabled")
   
}

const bouttonAddPhotos = document.createElement("button")
    popup.appendChild(bouttonAddPhotos)
    bouttonAddPhotos.classList.add("buttonAddPhotos")
    bouttonAddPhotos.classList.add("boutonEdition")
    bouttonAddPhotos.innerText = "Ajouter une photo"
    


    bouttonAddPhotos.addEventListener("click", () => {
        
        galleryEdit.innerHTML = ""
        popupTitre.innerText = "Ajouter une photo"

        const popupForm = document.createElement("form")
        galleryEdit.appendChild(popupForm)
        const labelImage = document.createElement("label"); // Créez un élément label
        labelImage.setAttribute("for", "photoImage"); // Associez-le au champ d'entrée en utilisant l'attribut 'for'
        labelImage.innerText = "Image"; // Texte du libellé
        popupForm.appendChild(labelImage);


        const photoImage = document.createElement("input")
        popupForm.appendChild(photoImage)
        photoImage.type = "file"
        const labelTitre = document.createElement("label"); // Créez un élément label
        labelTitre.setAttribute("for", "photoTitre"); // Associez-le au champ d'entrée en utilisant l'attribut 'for'
        labelTitre.innerText = "Titre"; // Texte du libellé
        popupForm.appendChild(labelTitre);
        const photoTitre = document.createElement("input")
        popupForm.appendChild(photoTitre)
        photoTitre.type = "text"
        const labelCategory = document.createElement("label"); // Créez un élément label
        labelCategory.setAttribute("for", "photoCategory"); // Associez-le au champ d'entrée en utilisant l'attribut 'for'
        labelCategory.innerText = "Catégorie"; // Texte du libellé
        popupForm.appendChild(labelCategory);
        const photoCategory = document.createElement("input")     
        popupForm.appendChild(photoCategory)
        photoCategory.type = "select"
        const bouttonAddPhotosSubmit = document.createElement("button")
        popupForm.appendChild(bouttonAddPhotosSubmit)
        bouttonAddPhotosSubmit.classList.add("boutonEdition")
        bouttonAddPhotosSubmit.innerText = "Valider Ajout"

        bouttonAddPhotos.classList.add("disabled")
    })