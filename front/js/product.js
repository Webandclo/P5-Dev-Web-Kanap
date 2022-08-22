//On récupérer l’URL du page courante.
var str = window.location.href;

//On récupérer  un nouvel objet
var url = new URL(str);

//On récupère l'ID du produit
//var name = url.searchParams.get("id");

//console.log( 'url.searchParams.get("id") idProduct :', name); //id du produit


var search_params = new URLSearchParams(url.search); 
if(search_params.has('id')) {
  var idProduct = search_params.get('id');
  console.log('name ',idProduct)
}


// Constante couleur & quantité
const productColor = document.querySelector ('#colors');
const productQuantity = document.querySelector('#quantity');


//on va chercher l'API avec la methode fetch et on ajoute notre variable qui contient l'id
let product;
async function getProduct() {
    await fetch("http://localhost:3000/api/products/" + idProduct)
    .then(data => data.json()
    .then(json => product = json))
    //console.log("product1", product)

    .catch((error) => {
        console.log("Erreur de la requête API");
    })
    // .catch(function(err) {
    //   // Une erreur est survenue
    //   return error;
    // })
};
getProduct(); // On appelle la fonction


// Selectionner dans le DOM

function getPost(product){
      //ajout image 
      let productImage = document.createElement("img");
      document.querySelector(".item__img").appendChild(productImage);
      productImage.src = product.imageUrl;
      productImage.alt = product.altTxt;
}

getPost(product); // On appelle la fonction





/// Teste à effacer ///




/// Fin test ///