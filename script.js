let user, url



function setUser(user) {
    document.location.href = 'index.html';
    document.querySelector('.user-name').innerText = user.name
}

let loginInputs = document.querySelectorAll('.login input')

loginInputs.forEach((input) => {
    input.addEventListener("keypress", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            document.querySelector(".login-btn").click();
        }
    });
})

let loginBtn = document.querySelector('.login-btn')

if (loginBtn != null) {
    loginBtn.addEventListener('click', (loginBtn) => {
        mainElement = loginBtn.closest('.login-form')
        console.log(mainElement)
        let username = mainElement.querySelector('#usernameText').value
        let password = mainElement.querySelector('#passwordText').value
        url = `http://localhost:8080/user/${username}/${password}`
        fetch(url, {
            method: 'GET'
        }).then((response) => {
            console.table(response)
            return response.json();
        }).then((data) => {
            user = data
            console.table(data)
            setUser(data);
        }).catch((err) => {
            console.log(err);
        })
    })
}
function fetchProducts() {
    let productHolder = document.querySelector('.product-holder')
    let barcode, price, productName, unit
    fetch('http://localhost:8080/product', {
        method: 'GET'
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
                            <div class="add-to-cart-div">
                                <input type="number" placeholder="1" min="1" max="99">
                                <button class="btn btn-primary" onclick='addToCart(this)'>Add to cart</button>
                            </div>
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
    let amount = Number(mainElement.querySelector('input').value)
    mainElement.querySelector('input').value = 1
    mainElement.querySelector('input').setAttribute('disabled', true)
    btn.innerText = 'Item added'
    btn.setAttribute('disabled', true)
    let item = {
        "orderNumber": "001",
        "amount": amount,
        "productName": productName
    }
    fetch(`http://localhost:8080/item`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then((response) => response.json())
        .then((data) => {
            console.table(data)
        }).catch((err) => {
            console.log(err);
        })


}