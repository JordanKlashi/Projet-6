
const apiWorks = "http://localhost:5678/api/works";
const apiCategory = "http://localhost:5678/api/categories";

let projets = [];
let category = 0;
let categoryData = [];
let categData;
let categDataName;




// on récupère les données de l'API Works
const getworks = () => {
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
            setModal()
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de la récupération des données", error);
        });
}
getworks()
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
    divFiltres.innerHTML = ""
    const uniqueCategoryIds = [];

    const boutonTous = document.createElement("button")
    divFiltres.appendChild(boutonTous)
    boutonTous.classList.add("filtres-boutton")
    boutonTous.innerText = "Tous"
    boutonTous.addEventListener("click", function () {
        category = 0;
        mesProjets();
        const boutonsFiltres = document.querySelectorAll(".filtres-boutton");
        boutonsFiltres.forEach(bouton => bouton.classList.remove("filtres-boutton_selected"));
        // Mettez à jour la classe du bouton "Tous"
        boutonTous.classList.add("filtres-boutton_selected");
    });
    for (let i = 0; i < projets.length; i++) {
        const categoryId = projets[i].categoryId;
        if (!uniqueCategoryIds.includes(categoryId)) {
            uniqueCategoryIds.push(categoryId);
        }
    }


    for (let index = 0; index < uniqueCategoryIds.length; index++) {
        const categoryId = uniqueCategoryIds[index];
        const categoryData = projets.find(p => p.categoryId === categoryId);
        const boutonFiltres = document.createElement('button');
        boutonFiltres.classList.add("filtres-boutton");

        boutonFiltres.innerText = categoryData.category.name; // Utilisez le nom de la catégorie

        boutonFiltres.addEventListener("click", () => {
            category = categoryId
            mesProjets()
            const boutonsFiltres = document.querySelectorAll(".filtres-boutton");
            boutonsFiltres.forEach(bouton => bouton.classList.remove("filtres-boutton_selected"));
            // Mettez à jour la classe du bouton actuel
            boutonFiltres.classList.add("filtres-boutton_selected");

        });

        divFiltres.appendChild(boutonFiltres);
    }
}

// Suite à la création des boutons, ont leur applique leur animation 



// relie le DOM

const introduction = document.getElementById("introduction");
const portFolio = document.getElementById("portfolio");
// on créée des boutons édition fictif 

const btnEditIntro = document.createElement("button")
introduction.appendChild(btnEditIntro)
btnEditIntro.classList.add("boutonEditionMenu")
btnEditIntro.innerText = "Modifier"


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
        setModal();
    });
    cross.addEventListener("click", () => {
        cacherPopup();
    });
    arrowLeft.addEventListener("click", () => {
        setModal()
        arrowLeft.classList.add("disabled")
    })

}
initAddEventListenerPopup();

// on génère les photos dans le mode edit 
const ModalGallery = document.querySelector(".popup-galerie");
const popupTitre = document.querySelector(".popup-titre");

// on met en place le popup setModal
function setModal() {
    ModalGallery.innerHTML = "";

    for (let i = 0; i < projets.length; i++) {

        const photos = projets[i]
        const ModalGalleryPhotos = document.createElement("figure");
        const galleryPhotos = document.createElement("img");

        const buttonDeletePhotos = document.createElement("button");
        buttonDeletePhotos.classList.add("boutton-effacer");


        const iconTrash = document.createElement("i");
        iconTrash.classList.add("fa", "fa-trash"); // Ajoutez les classes Font Awesome

        // Ajoutez l'icône au bouton
        buttonDeletePhotos.appendChild(iconTrash);


        buttonDeletePhotos.setAttribute("data-id", photos.id); // Stockez l'ID de la photo comme attribut de données
        buttonDeletePhotos.addEventListener("click", () => {
            console.log(`${photos.id}`)

            deletWork(photos.id)

        });

        galleryPhotos.src = photos.imageUrl;

        ModalGallery.appendChild(ModalGalleryPhotos);
        ModalGalleryPhotos.appendChild(galleryPhotos);
        ModalGalleryPhotos.appendChild(buttonDeletePhotos);
    }

    popupTitre.innerText = "supprimer des photos";
    bouttonAddPhotos.classList.remove("disabled");
}

const deletWork = (id) => {

    if (confirm("Êtes vous sûr de vouloir supprimer cette photo ?") == true) {


        // API supprimer photo 
        const info = JSON.parse(localStorage.getItem("info"))
        if (info) {
            const { userId, token } = info;

            fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (response.ok) {
                        getworks()
                        console.log("Suppression réussie. ")

                    } else {
                        console.error("Echec de la suppresion")
                    }
                })
                .catch(error => {
                    console.error("Erreur lors de la suppresion:", error)
                })
        } else {
            console.error("Aucune information d\'autorisation trouvée dans le localStorage")
        }
    }
}
// on rajoute eventListener pour le clic sur le bouton 
// on crée le bouton pour ajouter les photos 

const bouttonAddPhotos = document.createElement("button");
popup.appendChild(bouttonAddPhotos);
bouttonAddPhotos.classList.add("buttonAddPhotos");
bouttonAddPhotos.classList.add("boutonEdition");
bouttonAddPhotos.innerText = "Ajouter une photo";

//on génére la page d'ajout des photos

function ajouterPhotos() {

    ModalGallery.innerHTML = ""
    popupTitre.innerText = "Ajouter une photo"
    arrowLeft.classList.remove("disabled")

    const popupForm = document.createElement("form")
    ModalGallery.appendChild(popupForm)

    const labelImage = document.createElement("label");
    labelImage.setAttribute("for", "photoImage");
    labelImage.innerText = "Image";
    popupForm.appendChild(labelImage);

    const photoImage = document.createElement("input")
    photoImage.type = "file"
    photoImage.id = "photoImage"; // Ajout de l'ID pour l'attribut "for" du label
    popupForm.appendChild(photoImage);

    const labelTitre = document.createElement("label");
    labelTitre.setAttribute("for", "photoTitre");
    labelTitre.innerText = "Titre";
    popupForm.appendChild(labelTitre);

    const photoTitre = document.createElement("input")
    photoTitre.type = "text"
    photoTitre.id = "photoTitre";
    popupForm.appendChild(photoTitre);

    const labelCategory = document.createElement("label");
    labelCategory.setAttribute("for", "photoCategory");
    labelCategory.innerText = "Catégorie";
    popupForm.appendChild(labelCategory);

    const selectCategory = document.createElement("select");
    selectCategory.name = "photoCategory";
    selectCategory.id = "photoCategory";
    popupForm.appendChild(selectCategory);

    const optionNull = document.createElement("option")
    selectCategory.appendChild(optionNull)

    for (let i = 0; i < categData.length; i++) {
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
        event.preventDefault();
        if (
            photoTitre.value.trim() === "" ||
            photoImage.files.length === 0 ||
            selectCategory.value === ""

        ) {
            alert("Veuillez remplir tous les champs obligatoires.");
        } else {
            const info = JSON.parse(localStorage.getItem("info"));
            if (info) {
                const { userId, token } = info;

                const formData = new FormData();
                formData.append("title", photoTitre.value);
                formData.append("image", photoImage.files[0]);
                formData.append("category", selectCategory.value);

                fetch(`http://localhost:5678/api/works`, {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "accept": "application/json",
                    },
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('La requête a échoué.');
                        }
                        return response.json();
                    })
                    .then(data => {
                        // "data" contient le contenu de la réponse JSON
                        // Vous pouvez maintenant travailler avec les données
                        // projets.push(data); // Ajoutez la nouvelle photo à la liste
                        // localStorage.setItem("photos", JSON.stringify(data)); // Enregistrez la liste mise à jour
                        // console.log("succès")

                        // mesProjets();
                        // console.log("succès")
                        getworks()

                    })
                    .catch(error => {
                        console.error(error);
                    });
                console.log(photoImage.files)
                console.log(photoTitre.value)
                console.log(selectCategory.value)

            }
        }
    });

    bouttonAddPhotos.classList.add("disabled")
}


bouttonAddPhotos.addEventListener("click", () => {
    ajouterPhotos()
})

function previsuPhotos()  {

}

