
/* NOTE: Much of this code is from the tutorial https://www.youtube.com/watch?v=YeFzkC2awTM
I have edited it to be simpler and work better for what I wanted to do on my site but it is still very
similar because I lack the javascript skills to pull this off without help from a tutorial
 */

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

var total = 0;

function ready() {

    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var addToCartButtons = document.getElementsByClassName('orderButton')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('placeOrder')[0].addEventListener('click', checkingOut)

}

function removeCartItem(event) {

    var buttonClicked = event.target
    var cartItem = buttonClicked.parentElement.parentElement
    var rPrice = cartItem.getElementsByClassName('cartPrice')[0].innerText
    total = total - rPrice
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('itemName')[0].innerText
    var price = shopItem.getElementsByClassName('price')[0].innerText
    total += parseFloat(price)
    addItemToCart(title, price)
    updateCartTotal()
}




function addItemToCart(title, price) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]

    var cartRowContents = `
        <div class="cartItem cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cartPrice cart-column">${price}</span>
        <div>
            <button class="btn btn-danger" type="button">Remove</button>
        </div>
       `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
}

function updateCartTotal() {

    var subTotal = Math.round(total * 100) / 100
    var tax = Math.round((total * .06) * 100) /100
    var cartTotal = Math.round((subTotal + tax) * 100) / 100

    document.getElementsByClassName('subTotal')[0].innerText = '$' + subTotal
    document.getElementsByClassName('tax')[0].innerText = '$' + tax
    document.getElementsByClassName('totalPrice')[0].innerText = '$' + cartTotal

}

function checkingOut() {

    alert('Thank you your order will be out for delivery soon!')

}
