
const apiWorks = "http://localhost:5678/api/works"

// on récupére données de l'API

fetch(apiWorks)
    .then(reponse => {
        if (!reponse.ok) {
            throw new Error(`Erreur HTTP! statut: ${reponse.status}`)
        }
        return reponse.json();
    })
    .then(data => {
        projets = data
        mesProjets(projets)

    })
    .catch(error => {
        console.error("Une erreur s'est produite lors de la récupération des données", error);

    })

// on génére les projets
const gallery = document.querySelector(".gallery")

function mesProjets(projets) {
    gallery.innerHTML = ""
    for (let i = 0; i < projets.length; i++) {
        
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





//gestion des bouttons
const boutonTous = document.getElementById("tous")
boutonTous.addEventListener("click", function () {
    
    mesProjets(projets)
})



const boutonObjets = document.querySelector(".objets")
boutonObjets.addEventListener('click', () => {
   
    const projetObjets = projets.filter(function (projets){
        return projets.categoryId === 1
    })
    mesProjets(projetObjets)
})

const boutonAppartements = document.querySelector(".appartements")
boutonAppartements.addEventListener("click", () => {
    
    const projetAppartements = projets.filter(function (projets){
        return projets.categoryId === 2
    })
    mesProjets(projetAppartements)
})

const boutonHotelRestaurant = document.querySelector(".hotel-restaurants")
boutonHotelRestaurant.addEventListener("click", () => {
    
    const projetHotelRestaurant = projets.filter(projets => projets.categoryId === 3)
    mesProjets(projetHotelRestaurant)
})
