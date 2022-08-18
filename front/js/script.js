// Récupérer les produits de l'API
function AllProducts() {
    fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .catch(function(err) {
        // Une erreur est survenue
        return error;
      })
    }






// Afficher dans le DOM


// for (let i = 0; i < products.length; i++) {
        // Ceci on compte le nombre de produits
        // À chaque éxécution, la variable "products" augmentera de 1
        // Lorsque'elle aura affiché tous les produits, le boucle se terminera.
    //code

    //console.log(products);
// }


let product = document.querySelector("#items");

let productA = document.createElement("a");
product.appendChild(productA);

let productArticle = document.createElement("article");
productA.appendChild(productArticle);

let productImg = document.createElement("img");
productArticle.appendChild(productImg);
productImg.src = "product01.jpg";

let productH3 = document.createElement("h3");
productArticle.appendChild(productH3);
productH3.innerText = "Kanap name1";
productH3.classList.add("productName");

let productP = document.createElement("p");
productArticle.appendChild(productP);
productP.classList.add("productDescription");
productP.innerText = "Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.";






console.log(product);

