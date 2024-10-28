const ENDPOINT = "https://striveschool-api.herokuapp.com/api/product/";
const API_ENDPOINT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzFjYmUzOWJiZDU2YTAwMTVlZjRjZTciLCJpYXQiOjE3MzAwNTkxMjgsImV4cCI6MTczMTI2ODcyOH0.XxoNaT6anriNSeS7iynl_WXbMgtGIZb5xJiklaUHfrM";

const AuthURL = "Bearer " + API_ENDPOINT;

// Prendo gli elementi che mi interessano
const takeForm = document.getElementById("addProductsForm");
const productName = document.getElementById("name");
const productBrand = document.getElementById("brand");
const productImg = document.getElementById("img");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");

// Rimuove la validazione e resetta i valori del form dopo l'invio, la fetch aspetta prima di essere eseguita
takeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  await doFetch();

  // resetta i campi del form dopo l'invio
  e.target.reset();
});

async function doFetch() {
  // crea l'oggetto da inviare con i dati del form
  const yourProduct = {
    name: productName.value,
    brand: productBrand.value,
    imageUrl: productImg.value,
    price: productPrice.value,
    description: productDescription.value,
  };

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: AuthURL,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(yourProduct), // converti l'oggetto in JSON
    });

    if (!response.ok) {
      console.log("Prodotto aggiunto con successo!");
    }
  } catch (error) {
    console.error("Errore di rete:", error);
  }
}

// Method : "PUT" / "PATCH" non creato, zero idee su come implementarlo sulla pagina
