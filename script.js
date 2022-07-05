let cartItems
let user

function setUser(user) {
    document.location.href = 'index.html';
    document.querySelector('.user-name').innerText = user.name
}

function loginValidation(btn) {
    mainElement = btn.closest('.login-form')
    console.log(mainElement)
    let username = mainElement.querySelector('#usernameText').value
    let password = mainElement.querySelector('#passwordText').value
    
    fetch(`http://localhost:8080/product/`+username+`/`+password, {
        method : 'GET'
    })
        .then((response) => {
            console.table(response)
            return response.json();
        }).then((data) => {

            user = data
            console.table(data)
            setUser(data);
        }).catch((err) => {
            console.log(err);
        })
        
}

function fetchProducts() {
    let productHolder = document.querySelector('.product-holder')
    let barcode, price, productName, unit

    fetch('http://localhost:8080/product', {
        method : 'GET'
    })
        .then((response) => {
            console.table(response)
            return response.json();
        }).then((data) => {
            console.table(data)

            data.map((values) => {
                barcode = values.barcode
                productName = values.name
                price = values.price
                unit = values.unit

                productHolder.innerHTML +=
                    `<div class="card product-item" style="width: 18rem;">
                        <div class="card-body product">
                            <h5 class="card-title">${productName}</h5>
                            <p class="card-text">A price for ${productName} is ${price} din. Unit ${unit}.
                            Barcode of this product is ${barcode}. Buy it now by clicking the button bellow!</p>
                            <div class="input-group-sm mb-3">
                                <input type="number" class="form-control" placeholder="amount" min="1" aria-label="amount">
                            </div>
                            <button class="btn btn-primary" onclick='addToCart(this)'>Add to cart</button>
                        </div>
                    </div>`
            });
        }).catch((err) => {
            console.log(err);
        })
}

function addToCart(btn) {

    mainElement = btn.closest('.product-item')
    let productName = mainElement.querySelector('h5').innerText
    let amount = Number(mainElement.querySelector('input').innerText)
    let product
    fetch(`http://localhost:8080/product/${productName}`, {
        method : 'GET'
    })
        .then((response) => {
            console.table(response)
            return response.json();
        }).then((data) => {
            console.table(data)

            product = data

        }).catch((err) => {
            console.log(err);
        })


}