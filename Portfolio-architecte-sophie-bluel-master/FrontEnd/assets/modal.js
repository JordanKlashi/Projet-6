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
        galleryPhotos.classList.add("deletImg")

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
const line = document.createElement("div");
popup.appendChild(line);
line.classList.add("underline")

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
    popupForm.appendChild(labelImage);
    labelImage.classList.add("divlabimg")

    const divLabelImage = document.createElement("div")
    labelImage.appendChild(divLabelImage)

    const photoPreview = document.createElement("img")
    photoPreview.classList.add("addimgStyle")
    photoPreview.src = "assets/images/sansimage.jpg"
    labelImage.appendChild(photoPreview)

    const photoImage = document.createElement("input")
    photoImage.type = "file"
    photoImage.id = "photoImage";
    photoImage.style = "display:none"
    popupForm.appendChild(photoImage);
    photoImage.id = "photoImage"
    photoImage.addEventListener("change", () => {
        console.log("img")
        checkInputs()
    });

    photoImage.addEventListener("change", () => {
        if (photoImage.files.length > 0) {
            const selectedFile = photoImage.files[0];
            const imageURL = URL.createObjectURL(selectedFile);
            photoPreview.src = imageURL;
        }
    })

    const labelTitre = document.createElement("label");
    labelTitre.setAttribute("for", "photoTitre");
    labelTitre.innerText = "Titre";
    popupForm.appendChild(labelTitre);

    const photoTitre = document.createElement("input")
    photoTitre.type = "text"
    photoTitre.id = "photoTitre";
    photoTitre.classList.add("inputStyle")
    popupForm.appendChild(photoTitre);
    photoTitre.id = "photoTitre"
    photoTitre.addEventListener("input", () => {
        console.log("titre")
        checkInputs()
    });


    const labelCategory = document.createElement("label");
    labelCategory.setAttribute("for", "photoCategory");
    labelCategory.innerText = "Catégorie";
    popupForm.appendChild(labelCategory);

    const selectCategory = document.createElement("select");
    selectCategory.name = "photoCategory";
    selectCategory.id = "photoCategory";
    popupForm.appendChild(selectCategory);
    selectCategory.id = "selectCategory"
    selectCategory.addEventListener("change", () => {
        console.log("category")
        checkInputs()
    });

    const optionNull = document.createElement("option")
    selectCategory.appendChild(optionNull)
    optionNull.innerText = "*Veuillez Selectionner une catégorie*"

    for (let i = 0; i < categData.length; i++) {
        const option = document.createElement("option");
        option.value = categData[i].id;
        option.innerText = categData[i].name;
        selectCategory.appendChild(option);
    }
    line.classList.remove("underline")
    const underLine2 = document.createElement("div");
    popupForm.appendChild(underLine2);
    underLine2.classList.add("underline")


    const bouttonAddPhotosSubmit = document.createElement("button")
    popupForm.appendChild(bouttonAddPhotosSubmit)
    bouttonAddPhotosSubmit.classList.add("boutonEditionDisabled")
    bouttonAddPhotosSubmit.innerText = "Valider"
    bouttonAddPhotosSubmit.id = "bouttonAddPhotosSubmit"


    bouttonAddPhotosSubmit.addEventListener("click", (event) => {
        event.preventDefault();
        if (
            photoTitre.value.trim() === "" ||
            photoImage.files.length === 0 ||
            selectCategory.value === "*Veuillez Selectionner une catégorie*"

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
                        getworks()
                    })
                    .catch(error => {
                        console.error(error);
                    });
                arrowLeft.classList.add("disabled")
                line.classList.add("underline")

            }
        }
    });

    bouttonAddPhotos.classList.add("disabled")
}


bouttonAddPhotos.addEventListener("click", () => {
    ajouterPhotos()
})

function checkInputs() {

    if (
        (photoTitre.value.trim() === "" ||
            photoImage.files.length === 0 ||
            selectCategory.value === "*Veuillez Selectionner une catégorie*")

    ) {
        bouttonAddPhotosSubmit.disabled = true
        bouttonAddPhotosSubmit.classList.add("boutonEditionDisabled"); // Remplacez "grey" par "boutonEditionDisabled"
        bouttonAddPhotosSubmit.classList.remove("boutonEdition"); // Remplacez "green" par "boutonEdition"
    } else {
        bouttonAddPhotosSubmit.disabled = false
        bouttonAddPhotosSubmit.classList.remove("boutonEditionDisabled"); // Remplacez "grey" par "boutonEditionDisabled"
        bouttonAddPhotosSubmit.classList.add("boutonEdition"); // Remplacez "green" par "boutonEdition"
    }
}



