///Fonctions gestion panier

// Envoyer des produits dans le localStorage

function savePanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
    // console.log('id',contenuPanier.id);
    // console.log('color',contenuPanier.color);
    // console.log('quantity',contenuPanier.quantity);
}

// Récuperer des produits enregistrés dans le localStorage 

function getPanier() {
    let panier = localStorage.getItem("panier")
    if (panier == null) {
        return []
    } else {
        return JSON.parse(panier)
    }
}


// Ajouter le produit selectionné dans le localStorage et verification des doublons 

function addPanier(product) {
    let panier = getPanier();
    let foundProduct = panier.find(produitCourant => produitCourant.id === product.id) && panier.find(produitCourant => produitCourant.color == product.color)

    if (foundProduct != undefined) {
        let quantitySelectionne = product.quantity;
        let numberQuantity = quantitySelectionne;
        foundProduct.quantity += numberQuantity;
        console.log('Produit suplémentaire ajouté au panier')
    } else {
        console.log('Nouveau produit ajouté au panier')
        panier.push(product)
    }
    savePanier(panier)
}


// Supprimer un produit ciblé du localStorage   

function removeFromPanier(product) {
    let panier = getPanier()
    panier = panier.filter(p => p.id != product.id)
    savePanier(panier)
}


// Gestion de l'ajout de quantité 

function addQuantity(product) {
    let panier = getPanier()
    //console.log(panier)
    let foundProduct = panier.find(p => p.id == product.id)
    if (foundProduct != undefined) {
        foundProduct.quantity = product.quantity
    }

    savePanier(panier)
}