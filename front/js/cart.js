let panierStorage = localStorage.getItem("panier");
let panierArray= JSON.parse(panierStorage);
console.log('contenuPanier',contenuPanier);


const cartItems= document.getElementById('cart__items');

function afficheProduit (panierArray) {
    let contenuArtciles = "";

    //On boucle sur chaque produit et on construit les cards en HTML
    for (let jsonProduct of panierArray) {

        contenuArtciles += ` <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                                <div class="cart__item__img">
                                <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                                </div>
                                <div class="cart__item__content">
                                <div class="cart__item__content__description">
                                    <h2>${jsonProduct.name}</h2>
                                    <p>Vert</p>
                                    <p>${jsonProduct.price}</p>
                                </div>
                                <div class="cart__item__content__settings">
                                    <div class="cart__item__content__settings__quantity">
                                    <p>Qté : </p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                                    </div>
                                    <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem">Supprimer</p>
                                    </div>
                                </div>
                                </div>
                            </article> `
    }
}