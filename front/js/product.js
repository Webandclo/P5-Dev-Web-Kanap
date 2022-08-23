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

///
  // Requête de l'API
  async function getProduct() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/products/" + idProduct
      );

      const responseProduct = await response.json();

      //console.log("responseProduct", responseProduct)
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

function getPost(product){
      //Ajouter image 
      let productImage = document.createElement("img");
      document.querySelector(".item__img").appendChild(productImage);
      productImage.src = product.imageUrl;
      productImage.alt = product.altTxt;
}

//getPost(product); // On appelle la fonction

////

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
  document.querySelector(".item__img").insertAdjacentHTML("afterbegin", `<img src="${product.imageUrl}" alt="${product.altTxt}">`);
  document.querySelector("#title").insertAdjacentHTML("afterbegin", `${product.name}`);
  document.querySelector("#price").insertAdjacentHTML("afterbegin", `${product.price}`);
  document.querySelector("#description").insertAdjacentHTML("afterbegin", `${product.description}`);
  for (let productSelectColor of product.colors) {
    document.querySelector("#colors").innerHTML += `<option value="${productSelectColor}">${productSelectColor}</option>`
  };

}