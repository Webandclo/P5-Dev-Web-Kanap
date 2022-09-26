// Récupérer les produits de l'API
fetch("http://localhost:3000/api/products/")
    .then(data => data.json())


// Création de chaque éléments avec interpolation de variable
.then(jsonListProduct => {
    let contenu = "";

    //On boucle sur chaque produit et on construit les cards en HTML
    for (let jsonProduct of jsonListProduct) {

        contenu += `    <a href="./product.html?id=${jsonProduct._id}">
                        <article>
                        <img src="${jsonProduct.imageUrl}" alt="${jsonProduct.altTxt}">
                        <h3 class="productName">${jsonProduct.name}</h3>
                        <p class="productDescription">${jsonProduct.description}</p>
                        </article>
                        </a> `
                        //console.log(jsonProduct._id);
                        //console.log(jsonProduct);
    }

    // Selectionner dans le DOM
    let sectionIems = document.querySelector("#items")

    // Afficher dans le DOM
    sectionIems.innerHTML = contenu;
});