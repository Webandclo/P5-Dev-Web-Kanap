// Recupération du localStorage 

let panier = getPanier()

if (panier.length == 0) {
    alert("Votre panier est vide")
}

fetch("http://localhost:3000/api/products")
    .then((data) => data.json())
    .then((objetProduits) => {
        //console.log(objetProduits);
        // appel de la fonction affichagePanier
        affichagePanier(objetProduits);
    })
    .catch((err) => {
        document.querySelector("#cartAndFormContainer").innerHTML = "<p><b>erreur 404</b></p>";
        console.log("erreur 404, sur ressource api: " + err);
    });


// Verification du formulaire 

let form = document.querySelector('.cart__order__form')

form.firstName.addEventListener('change', function () {
    validNameCity(this)
    console.log("Change firstName");

})

form.lastName.addEventListener('change', function () {
    validNameCity(this)
    console.log("Change lastName");
})

form.city.addEventListener('change', function () {
    validNameCity(this)
    console.log("Change city");
})

form.email.addEventListener('change', function () {
    validMail(this)
    console.log("Change email");
})



// Création de l'objet contact au submit si formulaire valide et redirection vers la page de confirmation
form.addEventListener("submit", function (e) {
    e.preventDefault()
    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    const address = document.getElementById('address').value
    const city = document.getElementById('city').value
    const email = document.getElementById('email').value

    let panier = getPanier();

    if (validNameCity(form.firstName) == false) {
        alert("merci de renseigner votre Prénom")

    } else if (validNameCity(form.lastName) == false) {
        alert("merci de renseigner votre Nom")

    } else if (validNameCity(form.city) == false) {
        alert("merci de renseigner votre Ville")

    } else if (validMail(form.email) == false) {
        alert("merci de renseigner votre Email")

    } else if (panier.length == 0) {
        alert("votre panier est vide")

    } else {
        contact = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        }

        //on crée un tableau de product id
        let productsId = panier.map(i => i.id);

        let post = {
            contact: contact,
            products: productsId,
        }

        // Option necessaire à l'api pour utiliser POST

        const apiParam = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        }

        // Envoi des données au serveur

        fetch("http://localhost:3000/api/products/order", apiParam)
            .then(data => data.json())

            // Affichage du numéro de commande

            .then(order => {
                //let htmlOrderId = document.getElementById('orderId')
                let newOrderId = order.orderId;

                // Redirection vers la page confirmation
                window.location.assign(`confirmation.html?id=${newOrderId}`)

            })

        // Suppression du localStorage pour éviter les erreurs une fois la commande passé
        // On vide le panier

        localStorage.clear()

    }
})


////////////////////DEFINITION DES FONCTIONS//////////////////////////////////
// Fonctions qui déterminent les conditions d'affichage des produits du panier
//----------------------------------------------------------------------------


function affichagePanier(listeProduitAPI) {

    //console.log(index);
    // Récupérer le panier converti
    let panier = getPanier();
    // on déclare et on pointe la zone d'affichage
    let zonePanier = document.querySelector("#cart__items");

    //console.log(zonePanier);

    let recapPanierDom = "";

    //console.log(listeProduitAPI);
    // si il y a un panier avec une taille differente de 0 (donc supérieure à 0)
    if (panier && panier.length > 0) {
        // zone de correspondance clef/valeur de l'api et du panier
        for (let produitCourant of panier) {
            //console.log(choix);
            for (let i = 0, h = listeProduitAPI.length; i < h; i++) {
                if (produitCourant.id === listeProduitAPI[i]._id) {
                    // création de valeurs pour l'affichage
                    produitCourant.name = listeProduitAPI[i].name;
                    produitCourant.prix = listeProduitAPI[i].price;
                    produitCourant.image = listeProduitAPI[i].imageUrl;
                    produitCourant.description = listeProduitAPI[i].description;
                    produitCourant.alt = listeProduitAPI[i].altTxt;

                    recapPanierDom += `<article class="cart__item" data-id="${produitCourant.id}" data-couleur="${produitCourant.color}" data-quantite="${produitCourant.quantity}"> 
                                            <div class="cart__item__img">
                                                <img src="${produitCourant.image}" alt="${produitCourant.altTxt}">
                                            </div>
                                            <div class="cart__item__content">
                                                <div class="cart__item__content__titlePrice">
                                                <h2>${produitCourant.name}</h2>
                                                <span>couleur : ${produitCourant.color}</span>
                                                <p data-prix="${listeProduitAPI[i].price}">${listeProduitAPI[i].price} €</p>
                                                </div>
                                                <div class="cart__item__content__settings">
                                                <div class="cart__item__content__settings__quantity">
                                                    <p>Qté : </p>
                                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitCourant.quantity}">
                                                </div>
                                                <div class="cart__item__content__settings__delete">
                                                    <p class="deleteItem" data-id="${produitCourant.id}" data-couleur="${produitCourant.color}">Supprimer</p>
                                                </div>
                                                </div>
                                            </div>
                                        </article>`
                }
            }
        }

        // créait l'affichage si les conditions sont présentes
        //affichePanierDom(panier);
        //console.log(recapPanierDom);
        zonePanier.innerHTML = recapPanierDom;
        affichagetotalProduit();
    } else {
        // si il n'y a pas de panier on créait un H1 informatif et quantité appropriées
        document.querySelector("#totalQuantity").innerHTML = "0";
        document.querySelector("#totalPrice").innerHTML = "0";
        document.querySelector("h1").innerHTML =
            "Vous n'avez pas d'article dans votre panier";
    }
    gestionModifQuantite();
    gestionBoutonSuppressionProduit();
}



// fonction ajout nombre total produit et coût total
function affichagetotalProduit() {

    let objetProduits;

    fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((objetProduits) => {
            //console.log(objetProduits);

            //console.log(objetProduits);

            let panier = getPanier();
            // déclaration variable en tant que nombre
            let totalArticle = 0;

            let prixCombiné = 0;

            let totalPrix = 0;

            //console.log(panier)
            // zone de correspondance clef/valeur de l'api et du panier
            for (let produitCourant of panier) {
                for (let i = 0, h = objetProduits.length; i < h; i++) {
                    if (produitCourant.id === objetProduits[i]._id) {
                        // calcule la somme/prix total
                        totalArticle += JSON.parse(produitCourant.quantity);
                        prixCombiné = JSON.parse(produitCourant.quantity) * JSON.parse(objetProduits[i].price);
                        totalPrix += prixCombiné;
                    }
                }
            }
            document.getElementById("totalQuantity").textContent = totalArticle;
            document.getElementById("totalPrice").textContent = totalPrix;
        })
        .catch((err) => {
            document.querySelector("#cartAndFormContainer").innerHTML = "<h1>erreur 404</h1>";
            console.log("erreur 404, sur ressource api: " + err);
        });
}


// Suppression de l'élément ciblé au click 
function gestionBoutonSuppressionProduit() {
    document.querySelectorAll(".deleteItem").forEach(item => item.addEventListener("click", (e) => {
        let deletItem = e.target.closest('[data-id]')
        let product = deletItem.dataset
        removeFromPanier(product)
        window.location.assign("cart.html")
    }));
}

// Modifier l'élément ciblé au changement 
function gestionModifQuantite() {
    document.querySelectorAll(".itemQuantity").forEach(item => item.addEventListener("change", (e) => {

        let quantity = e.target.closest('.itemQuantity').value;
        //console.log(e.target.closest('.itemQuantity').value);
        let quantityNumber = parseInt(quantity);
        let deletItem = e.target.closest('[data-id]');
        let product = deletItem.dataset;

        //console.log(product)

        productID = {
            id: product.id,
            quantity: quantityNumber
        }

        // Afficher message d'erreur si quantité négative saisie

        if (quantityNumber <= 0) {
            //removeFromPanier(productID)
            alert("Vous ne pouvez pas selectionner une quantité avec une valeur négative");
            window.location.assign("cart.html")
        } else if (quantityNumber > 100) {
            //removeFromPanier(productID)
            alert("Vous ne pouvez pas selectionner une quantité qui dépasse 100");
            window.location.assign("cart.html")
        } else {

            // ajout de la quantité s'il n'y a pas d'anomalie 
            addQuantity(productID)
            alert("Votre changement de quantité a bien été prie en compte");
            // affichage de la quantité et du prix total
            affichagetotalProduit()

        }
    }))

    // Affichage de la quantité et du prix total
    //affichagetotalProduit();
}


//Fonctions contrôle champ formulaire
// regex nom, prénom et ville

function validNameCity(inputName) {
    let nameRegexp = new RegExp(/^[A-z \à\é\è\ô\ê\ë\ï\ç,.'-]+$/i)

    let testName = nameRegexp.test(inputName.value)
    let messageName = inputName.nextElementSibling
    if (testName) {
        messageName.innerHTML = ""
        return true
    } else {
        messageName.innerHTML = "Information incorrecte, veuillez vérifier les informations saisies."
        return false
    }
}



// Regex mail 

function validMail(inputMail) {
    let mailRegexp = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i)
    let testMail = mailRegexp.test(inputMail.value)
    let messageMail = inputMail.nextElementSibling
    if (testMail) {
        messageMail.innerHTML = ""
        return true
    } else {
        messageMail.innerHTML = "Adresse mail incorrecte, veuillez vérifier les informations saisies"
        return false
    }
}