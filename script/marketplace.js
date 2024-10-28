const ENDPOINT = "https://striveschool-api.herokuapp.com/api/product/";
const API_ENDPOINT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzFjYmUzOWJiZDU2YTAwMTVlZjRjZTciLCJpYXQiOjE3MzAwNTkxMjgsImV4cCI6MTczMTI2ODcyOH0.XxoNaT6anriNSeS7iynl_WXbMgtGIZb5xJiklaUHfrM";

const AuthURL = "Bearer " + API_ENDPOINT;

document.addEventListener("DOMContentLoaded", fetchProducts);

// Method: GET per prendere i dati JSON della fetch
async function fetchProducts() {
  try {
    const response = await fetch(ENDPOINT, {
      headers: { Authorization: AuthURL },
    });
    if (response.ok) {
      const products = await response.json();
      console.log("Products fetched successfully:", products);
      createCards(products);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

// funzione che crea le card del prodotto, per ogni dato mi crei la "card"
function createCards(products) {
  const container = document.querySelector(".row");

  products.forEach((product) => {
    const card = `
      <div class="col-3">
        <div class="card">
          <img src="${product.imageUrl}" class="card-img-top productImage" alt="" />
          <div class="card-body text-center p-4">
            <h5 class="card-title mb-3 productName">${product.name}</h5>
            <p class="card-text productBrand">${product.brand}</p>
            <p class="card-text productDescription">${product.description}</p>
            <p class="productPrice">${product.price}€</p>
            <div class="d-flex justify-content-center">
              <a href="product-details.html?id=${product._id}" class="btn btn-primary details" id="getProductButton">More Info</a>
              <button class="btn btn-danger delete-btn" data-id="${product._id}">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });

  // prendo dal documento il button Delete
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const productId = e.target.getAttribute("data-id");
      await deleteProduct(productId);
      window.location.reload();
    });
  });
}

// creo il method: "DELETE"
async function deleteProduct(productId) {
  try {
    const response = await fetch(`${ENDPOINT}${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: AuthURL,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("Prodotto eliminato con successo!");
      window.location.reload(); // ogni volta che cancello aggiorna la pagina
    } else {
      console.error(
        "Errore nell'eliminare il prodotto:",
        await response.json()
      );
    }
  } catch (error) {
    console.error("Errore di rete:", error);
  }
  searchParams();
}

// funzione che prende i parametri attuali della card da eliminare
function searchParams() {
  const params = new URLSearchParams(window.location.search);
  const productName = params.get("name");
  const productBrand = params.get("brand");
  const productImageUrl = params.get("imageUrl");
  const productDescription = params.get("description");
  const productPrice = params.get("price");

  document.getElementById("productName").textContent = productName;
  document.getElementById("productBrand").textContent = productBrand;
  document.getElementById("productImage").src = productImageUrl;
  document.getElementById("productDescription").textContent =
    productDescription;
  document.getElementById("productPrice").textContent = `${productPrice}€`;
}
