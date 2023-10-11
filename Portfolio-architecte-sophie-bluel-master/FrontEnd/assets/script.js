
const apiWorks = "http://localhost:5678/api/works";
const apiCategory = "http://localhost:5678/api/categories";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"

let projets = [];
let category = 0;
let categoryData = [];
let tryDelete = [];
let categData;
let categDataName;



// on récupère les données de l'API Works

fetch(apiWorks)
    .then(reponse => {
        if (!reponse.ok) {
            throw new Error(`Erreur HTTP! statut: ${reponse.status}`);
        }
        return reponse.json();
    })
    .then(data => {
        projets = data;
        createButtons();
        mesProjets();
        modeEditionPhotos();
    })
    .catch(error => {
        console.error("Une erreur s'est produite lors de la récupération des données", error);
    });

// on récupère les données de l'API Categories

fetch(apiCategory)
    .then(reponse => {
        if (!reponse.ok) {
            throw new Error(`Erreur HTTP! statut: ${reponse.status}`);
        }
        return reponse.json();
    })
    .then(data => {
        categData = data
        })
    .catch(error => {
        console.error("Une erreur s'est produite lors de la récupération des données", error);
    });

// on génère l'API Delete photos

function deletePhoto(photoId) {
    fetch(`http://localhost:5678/api/works/${photoId}`, {
        method: "DELETE",
        body: null,
        headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json; charset=UTF-8",
        }
        
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP! statut: ${response.status}`);
            }
            return response.json();
        })
        .then((json) => {
            // La photo a été supprimée avec succès
            deletePhoto()
        })
        .catch((error) => {
            console.error("Une erreur s'est produite lors de la suppression de la photo", error);
        });
}

// on récupére l'API Post photos

function postPhoto() {
    fetch(`http://localhost:5678/api/works/`), {
        method: "POST",
        body : {
            "id": 0,
            "title": "string",
            "imageUrl": "string",
            "categoryId": "string",
            "userId": 1
          },
        headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json; charset=utf-8",
        }
        
    }
}

// on génère les projets
const gallery = document.querySelector(".gallery");

function mesProjets() {
    gallery.innerHTML = "";
    for (let i = 0; i < projets.length; i++) {
        if (category === projets[i].categoryId || category === 0) {
            const article = projets[i];
            const projet = document.createElement("figure");
            const imageProjet = document.createElement("img");
            imageProjet.src = article.imageUrl;
            imageProjet.alt = article.title;
            const textProjet = document.createElement("figcaption");
            textProjet.innerText = article.title;

            // On rattache les balises à la section gallery
            gallery.appendChild(projet);
            projet.appendChild(imageProjet);
            projet.appendChild(textProjet);
        }
    }
}

// on génère les boutons
const divFiltres = document.querySelector(".filtres");

function createButtons() {
    const uniqueCategoryIds = [];

    for (let i = 0; i < projets.length; i++) {
        const categoryId = projets[i].categoryId;
        if (!uniqueCategoryIds.includes(categoryId)) {
            uniqueCategoryIds.push(categoryId);
        }
    }

    const divFiltres = document.querySelector(".filtres");

    for (let index = 0; index < uniqueCategoryIds.length; index++) {
        const categoryId = uniqueCategoryIds[index];
        const categoryData = projets.find(p => p.categoryId === categoryId);
        const boutonFiltres = document.createElement('button');
        boutonFiltres.classList.add("filtres-boutton");

        boutonFiltres.innerText = categoryData.category.name; // Utilisez le nom de la catégorie

        boutonFiltres.addEventListener("click", () => {
            category = categoryId; // Utilisez l'ID de catégorie
            mesProjets();
        });

        divFiltres.appendChild(boutonFiltres);
    }
}

//gestion du bouton tous 
const boutonTous = document.getElementById("tous");
boutonTous.addEventListener("click", function () {
    category = 0;
    mesProjets();
});

// relie le DOM
const introduction = document.getElementById("introduction");
const portFolio = document.getElementById("portfolio");

//mode édition
// afficher mode édition 
// on génère le popup
let popupBackground = document.querySelector(".popupBackground");
let cross = document.querySelector(".cross");
const popup = document.querySelector(".popup");
let arrowLeft = document.querySelector(".arrowLeft")
function afficherPopup() {
    popupBackground.classList.add("active");
    arrowLeft.classList.add("disabled")

}
function cacherPopup() {
    popupBackground.classList.remove("active");
}
function initAddEventListenerPopup() {
    // On écoute le click sur le bouton "Editer"
    btnEdit = document.querySelector(".boutonEdition");
    btnEdit.addEventListener("click", () => {
        afficherPopup();
        modeEditionPhotos();
    });
    cross.addEventListener("click", () => {
        cacherPopup();
    });
    arrowLeft.addEventListener("click", () => {
        modeEditionPhotos()
        arrowLeft.classList.add("disabled")
    })
    
}
initAddEventListenerPopup();

// on génère les photos dans le mode edit 
const galleryEdit = document.querySelector(".popup-galerie");
const popupTitre = document.querySelector(".popup-titre");

// on met en place le popup modeEditionPhotos
function modeEditionPhotos() {
    galleryEdit.innerHTML = "";

    for (let i = 0; i < projets.length; i++) {

        const photos = projets[i]

        const galleryEditPhotos = document.createElement("figure");
        const galleryPhotos = document.createElement("img");

        const buttonDeletePhotos = document.createElement("button");
        buttonDeletePhotos.classList.add("boutton-effacer");
        

        const iconTrash = document.createElement("i");
        iconTrash.classList.add("fa-solid", "fa-trash"); // Ajoutez les classes Font Awesome

        // Ajoutez l'icône au bouton
        buttonDeletePhotos.appendChild(iconTrash);


        buttonDeletePhotos.setAttribute("data-id", photos.id); // Stockez l'ID de la photo comme attribut de données
        buttonDeletePhotos.addEventListener("click", () => {
            console.log(`${photos.id}`)
            
        });

        galleryPhotos.src = photos.imageUrl;

        galleryEdit.appendChild(galleryEditPhotos);
        galleryEditPhotos.appendChild(galleryPhotos);
        galleryEditPhotos.appendChild(buttonDeletePhotos);
    }
    popupTitre.innerText = "supprimer des photos";
    bouttonAddPhotos.classList.remove("disabled");
}

// on rajoute eventListener pour le clic sur le bouton 
// on crée le bouton pour ajouter les photos 

const bouttonAddPhotos = document.createElement("button");
popup.appendChild(bouttonAddPhotos);
bouttonAddPhotos.classList.add("buttonAddPhotos");
bouttonAddPhotos.classList.add("boutonEdition");
bouttonAddPhotos.innerText = "Ajouter une photo";

//on génére la page d'ajout des photos

function ajouterPhotos(categData) {
    galleryEdit.innerHTML = ""
    popupTitre.innerText = "Ajouter une photo"
    arrowLeft.classList.remove("disabled")

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
    
    const selectCategory = document.createElement("select"); // Créez un élément select
    selectCategory.name = "photoCategory"; // Nommez-le
    popupForm.appendChild(selectCategory);

    for (let i = 0 ; i < categData.length ; i++) {
        const option = document.createElement("option"); 
        option.value = categData[i].id; 
        option.innerText = categData[i].name; 
        selectCategory.appendChild(option); 
    }

    const bouttonAddPhotosSubmit = document.createElement("button")
    popupForm.appendChild(bouttonAddPhotosSubmit)
    bouttonAddPhotosSubmit.classList.add("Trash")
    bouttonAddPhotosSubmit.classList.add("boutonEdition")

    bouttonAddPhotosSubmit.innerText = "Valider"

    bouttonAddPhotosSubmit.addEventListener("click", (event) => {
        event.preventDefault()
        
    })

    bouttonAddPhotos.classList.add("disabled")
}


bouttonAddPhotos.addEventListener("click", () => {
    ajouterPhotos(categData)
})






// action a modifier quand actualiser le login 
// pris contact pour effectuer le test
const headerEdit = document.querySelector(".headerEdit")

const loginTest = document.querySelector(".logintest")
loginTest.addEventListener("click", () => {
btnEdit.classList.add("disabled")
headerEdit.classList.add("disabled")
})

// même chose pour quand on se connecte
// permet de protéger la possibilités d'Edit

const logoutTest = document.querySelector(".logouttest")
logoutTest.addEventListener("click", () => {
    btnEdit.classList.remove("disabled")
    headerEdit.classList.remove("disabled")
})

