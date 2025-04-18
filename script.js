let numberOfElements = 0;

const handler = (page) => {
  console.log("handler is running", page);

  window.location.href = page;
};

function getValue() {
  let name = document.getElementById("distributer-name").value;

  let id = document.getElementById("distributer-id").value;
  console.log(name, id);

  window.location.href = `products.html?dn=${name}&id=${id}`;
}

function generateInputElement() {
  console.log("Generating html");

  const inputContainer = document.createElement("div");
  inputContainer.className = "eachProducts";
  inputContainer.style = "margin-top  : 20px";

  //make input

  const createProductCodeInput = document.createElement("input");
  createProductCodeInput.id = `productId${numberOfElements}`;
  createProductCodeInput.placeholder = `Product Code ${numberOfElements}`;

  const createProductNameInput = document.createElement("input");
  createProductNameInput.id = `productName${numberOfElements}`;
  createProductNameInput.placeholder = `Product Name ${numberOfElements}`;

  const createProductPriceInput = document.createElement("input");
  createProductPriceInput.id = `productPrice${numberOfElements}`;
  createProductPriceInput.placeholder = `Product Price ${numberOfElements}`;

  //Andar dal do

  // inputContainer.appendChild(createProductCodeInput);
  // inputContainer.appendChild(createProductNameInput);
  // inputContainer.appendChild(createProductPriceInput);

  inputContainer.append(createProductCodeInput, createProductNameInput, createProductPriceInput);

  numberOfElements++;

  document.getElementById("eachProductContainer").appendChild(inputContainer);
}

let products = [];

function saveDistributorData() {
  console.log("Saving data", numberOfElements);

  const urlParams = new URLSearchParams(window.location.search);
  const distributorName = urlParams.get("dn");
  const distributorId = urlParams.get("id");

  let isValid = true;
  let newProducts = [];

  // Loop from 0 to numberOfElements (inclusive)
  for (let index = 0; index <= numberOfElements; index++) {
    const nameInput = document.getElementById(`productName${index}`);
    const idInput = document.getElementById(`productId${index}`);
    const priceInput = document.getElementById(`productPrice${index}`);

    // Skip this index if the inputs don't exist (extra index from counter)
    if (!nameInput || !idInput || !priceInput) continue;

    let name = nameInput.value.trim();
    let id = idInput.value.trim();
    let price = priceInput.value.trim();

    if (!name || !id || !price) {
      alert(`Please fill all fields for Product ${index + 1}`);
      isValid = false;
      break;
    }

    newProducts.push({
      code: id,
      name,
      price,
    });
  }

  if (!isValid) return;

  // Save valid products
  products = [...products, ...newProducts];
  console.log(products);

  // Clear dynamically added inputs (index > 0)
  const eachProductContainer = document.getElementById("eachProductContainer");
  const children = Array.from(eachProductContainer.children);

  children.forEach((child, index) => {
    if (index > 0) {
      eachProductContainer.removeChild(child);
    }
  });

  numberOfElements = 0;

  // Clear the initial input fields (index 0)
  document.getElementById("productId0").value = "";
  document.getElementById("productName0").value = "";
  document.getElementById("productPrice0").value = "";

  alert("Products saved successfully!");
}
