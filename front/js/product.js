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



///
  // Requête de l'API
  async function getProduct() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/products/" + idProduct
      );

      const responseProduct = await response.json();

      console.log("responseProduct", responseProduct)
      //affichageInfoByCreateElement(responseProduct);
      affichageInfoByInnerHTML(responseProduct)


    } catch (error) {
      console.log(error.message);
    }
    // .catch(function(err) {
    //   // Une erreur est survenue
    //   return error;
    // })
  }
  
  
  getProduct(); // On appelle la fonction
///



// Selectionner dans le DOM




// Récupération des infos des produits
function affichageInfoByCreateElement(product) {
  let imgContainer = document.querySelector(".item__img");
  let productImg = document.createElement("img");
  productImg.src = product.imageUrl;
  productImg.alt = product.altTxt;
  imgContainer.appendChild(productImg);

  let productTitle = document.getElementById("title");
  productTitle.innerText = product.name;

  let productPrice = document.getElementById("price");
  productPrice.innerHTML = product.price;

  let productDescription = document.getElementById("description");
  productDescription.innerText = product.description;

  let colorId = document.getElementById("colors");
  let colorArray = product.colors;
  for (let color of colorArray) {
    colorId.innerHTML += `<option value="${color}"> ${color}</option>`;
  }
}

function affichageInfoByInnerHTML(product) {
  //Note : afterbegin = before its first child of the element
  document.querySelector(".item__img").insertAdjacentHTML("afterbegin", `<img src="${product.imageUrl}" alt="${product.altTxt}">`);
  document.querySelector("#title").insertAdjacentHTML("afterbegin", `${product.name}`);
  document.querySelector("#price").insertAdjacentHTML("afterbegin", `${product.price}`);
  document.querySelector("#description").insertAdjacentHTML("afterbegin", `${product.description}`);
  for (let productSelectColor of product.colors) {
    document.querySelector("#colors").innerHTML += `<option value="${productSelectColor}">${productSelectColor}</option>`
  };


}


//Gestion du panier



function addToCart(article) {
}

const productQuantity = document.getElementById("quantity");
const productColor = document.querySelector("#colors");






const btnAddToCArd = document.querySelector('#addToCart');

btnAddToCArd.addEventListener("click", function () {
  if (productQuantity.value > 0 && productQuantity.value <=100 && productQuantity.value != 0){
     //On stock le choix de la quantité
  const quantityValue = productQuantity.value ;
      //On stock le choix de la couleur
  const colorValue = productColor.value;
  console.log("quantité", quantityValue);
  console.log("coleur", colorValue);
  console.log('id produit',idProduct)
  localStorage.setItem('product',JSON.stringify({Couleur : colorValue, quantity: quantityValue, idproduit : idProduct}));

  productInfo = JSON.parse(localStorage.getItem('product'))
  console.table(productInfo);
  } if (productQuantity.value > 100 || productQuantity.value <= 0 ){
    let messageQuantite = document.querySelector('.item__content__settings__quantity').insertAdjacentHTML("afterend", `<i>Quantité maximum disponible 100 pièces</i>`);
  } 
  //document.getElementById('title').innerHTML = productInfo.Couleur;
});
