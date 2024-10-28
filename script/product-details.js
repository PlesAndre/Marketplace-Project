const ENDPOINT = "https://striveschool-api.herokuapp.com/api/product/";
const API_ENDPOINT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzFjYmUzOWJiZDU2YTAwMTVlZjRjZTciLCJpYXQiOjE3MzAwNTkxMjgsImV4cCI6MTczMTI2ODcyOH0.XxoNaT6anriNSeS7iynl_WXbMgtGIZb5xJiklaUHfrM";

const AuthURL = "Bearer " + API_ENDPOINT;
const main = document.querySelector("main");

// Chiama `loadProductFromURL` al caricamento della pagina
window.addEventListener("DOMContentLoaded", loadProductFromURL);

function takeProduct(id) {
  fetch(`${ENDPOINT}${id}`, {
    headers: {
      Authorization: AuthURL,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          console.error("Errore richiesta prodotto:", errorData);
          throw new Error("Errore richiesta prodotto");
        });
      }
      return response.json();
    })
    .then((product) => {
      main.innerHTML = `
          <h1 class="product-title mt-5">${product.name}</h1>
          <div class="container-fluid mt-5" id="more-details">
            <div class="row p-0">
              <div class="col p-0 d-flex flex-column align-items-center">
                <div class="img-product">
                  <img src="${product.imageUrl}" alt="product image" class="img-fluid" />
                </div>
                <div class="info-product text-center">
                  <p>${product.brand}</p>
                  <p>${product.description}</p>
                  <p>${product.price}€</p>
                </div>
              </div>
            </div>
          </div>`;
    })
    .catch((error) =>
      console.error("Errore nel fetch del prodotto:", error.message)
    );
}

// Funzione per ottenere l'ID dall'URL e chiamare `takeProduct`
function loadProductFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  if (id) {
    takeProduct(id); // carica i dettagli del prodotto con l'ID trovato nell'URL
  } else {
    console.error("ID del prodotto non trovato nell'URL");
  }
}
