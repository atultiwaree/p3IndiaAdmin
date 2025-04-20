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

  const createProductQuantitiy = document.createElement('input')
  createProductQuantitiy.id = `productQuantity${numberOfElements}`
  createProductQuantitiy.placeholder = `Quantity ${numberOfElements}`




  //Andar dal do

  // inputContainer.appendChild(createProductCodeInput);
  // inputContainer.appendChild(createProductNameInput);
  // inputContainer.appendChild(createProductPriceInput);

  inputContainer.append(createProductCodeInput, createProductNameInput, createProductPriceInput, createProductQuantitiy);

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
    const quantityInput = document.getElementById(`quantity${index}`)

    // Skip this index if the inputs don't exist
    if (!nameInput || !idInput || !priceInput || !quantityInput) continue;

    let name = nameInput.value.trim();
    let id = idInput.value.trim();
    let price = priceInput.value.trim();
    let quantity = quantityInput.value.trim()

    if (!name || !id || !price || !quantity) {
      alert(`Please fill all fields for Product ${index + 1}`);
      isValid = false;
      break;
    }

    newProducts.push({
      code: id,
      name,
      price: parseFloat(price),
      quantity
    });
  }

  if (!isValid) return;

  const distributorData = {
    name: distributorName,
    distributorId: distributorId,
    products: newProducts,
  };

  // Send POST request to backend
  fetch('https://p3indiabackend.onrender.com/api/distributors/add-distributor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(distributorData),
  })
    .then(res => res.json())
    .then(response => {
      if (response.message === 'Distributor added successfully') {
        alert('Distributor saved to database successfully!');
        console.log('Saved data:', response.data);

        // Clear dynamic inputs
        const eachProductContainer = document.getElementById("eachProductContainer");
        const children = Array.from(eachProductContainer.children);
        children.forEach((child, index) => {
          if (index > 0) {
            eachProductContainer.removeChild(child);
          }
        });

        numberOfElements = 0;
        document.getElementById("productId0").value = "";
        document.getElementById("productName0").value = "";
        document.getElementById("productPrice0").value = "";
        document.getElementById('quantity0').value = ""
      } else {
        alert('Error: ' + response.message);
      }
    })
    .catch(error => {
      console.error('Error saving distributor:', error);
      alert('Failed to save distributor. Check console for details.');
    });
}


async function addUser() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = "retailer";
  const passphrase = document.getElementById("passphrase").value.trim();

  // Basic validation
  if (!email || !password || !role || !passphrase) {
    alert("Please fill all fields.");
    return;
  }

  const body = { email, password, role, passphrase };

  try {
    const res = await fetch('https://p3indiabackend.onrender.com/api/auth/add-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (res.ok) {
      alert("User added successfully!");

      // Clear input fields
      document.getElementById("email").value = '';
      document.getElementById("password").value = '';
      // document.getElementById("role").value = '';
      document.getElementById("passphrase").value = '';
      
    } else {
      alert(data.message || "Something went wrong.");
    }
  } catch (err) {
    alert("Error while saving user: " + err.message);
  }
}
