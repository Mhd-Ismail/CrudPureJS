var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var addProductButton = document.getElementById("addProductButton")



//we will check first if the local storage has a data or not to decide what will be shown
var productsContainer;
if (localStorage.getItem("productsStorage") == null) {
    //yeb2a zbon gded w haykon awel wa7ed ydefo
    productsContainer = [];
} else {
    productsContainer = JSON.parse(localStorage.getItem("productsStorage"));
    displayProducts();
}


//add products function
function addProduct() {
    if (addProductButton.innerHTML == "add Product") {
        if (checkInputs() == true) {
            var product = {
                name: productName.value,
                price: productPrice.value,
                category: productCategory.value,
                desc: productDesc.value,
            };
            productsContainer.push(product);
            localStorage.setItem("productsStorage", JSON.stringify(productsContainer));
            displayProducts();
            clearProducts();
        } else {
            alert("All fields are required");
        }
    }
        
    
}

//function to clear the form after adding products
function clearProducts() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDesc.value = "";
}


// display products function
function displayProducts() {
    var cartoona = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        cartoona += `  <tr>
                    <td>${i}</td>
                    <td>${productsContainer[i].name}</td>
                    <td>${productsContainer[i].price}</td>
                    <td>${productsContainer[i].category}</td>
                    <td>${productsContainer[i].desc}</td>
                    <td><button onClick="getProductForm(${i})" class="btn btn-outline-success">Update</button></td>
                    <td><button onClick="deleteProducts(${i})" class="btn btn-outline-danger">Delete</button></td>
                </tr> `;
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}

// function to check the inputs
function checkInputs() {
    if (
        productName.value != "" &&
        productPrice.value != "" &&
        productCategory.value != "" &&
        productDesc.value != ""
    ) {
        return true;
    } else {
        return false;
    }
}


// delete products function
function deleteProducts(index) {
    productsContainer.splice(index, 1)
    localStorage.setItem("productsStorage", JSON.stringify(productsContainer));
    displayProducts()
}


// search input
function searchProducts(searchTerm) {
    var cartoona = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true) {

            cartoona += `  <tr>
                    <td>${i}</td>
                    <td>${productsContainer[i].name}</td>
                    <td>${productsContainer[i].price}</td>
                    <td>${productsContainer[i].category}</td>
                    <td>${productsContainer[i].desc}</td>
                    <td><button onClick="getProductForm(${i})" class="btn btn-outline-success">Update</button></td>
                    <td><button onClick="deleteProducts(${i})" class="btn btn-outline-danger">Delete</button></td>
                </tr> `;
            document.getElementById("tableBody").innerHTML = cartoona;
        } else {

        }

    }
}

// edit product function
function getProductForm(index) {
    productName.value = productsContainer[index].name;
    productPrice.value = productsContainer[index].price;
    productCategory.value = productsContainer[index].category;
    productDesc.value = productsContainer[index].desc;
    addProductButton.innerHTML = "Update";
    addProductButton.setAttribute("onclick", `updateProduct(${index})`)
}
function updateProduct(index) {
    if (addProductButton.innerHTML == "Update") {
        if (checkInputs() == true) {
                productsContainer[index].name = productName.value;
                productsContainer[index].price = productPrice.value;
                productsContainer[index].category = productCategory.value;
                productsContainer[index].desc = productDesc.value;
                
            localStorage.setItem("productsStorage", JSON.stringify(productsContainer));
            displayProducts();
            clearProducts();
            addProductButton.innerHTML = "add Product";
            addProductButton.setAttribute("onclick", "addProduct()")
        } else {
            alert("All fields are required");
        }
    }
}

