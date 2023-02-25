//Click to add

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
  bar.addEventListener('click', ()=> {
    nav.classList.add('active')
  })
}
if(close){
  close.addEventListener('click', ()=>{
    nav.classList.remove('active')
  })
}



// ******For user adding item quantity*****/
function increaseCount(a, b) {
    var input = b.previousElementSibling;
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input.value = value;
  }
  
  function decreaseCount(a, b) {
    var input = b.nextElementSibling;
    var value = parseInt(input.value, 10);
    if (value > 1) {
      value = isNaN(value) ? 0 : value;
      value--;
      input.value = value;
    }
  }

  //For click to change image
  var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("ourSlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}


//Add to cart function
let shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#cart-btn').onclick  = () =>{
  shoppingCart.classList.toggle('active');
}

//For Lightbox

function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


//Add to cart function//
var cartId = "cart";

var localAdapter = {

    saveCart: function (object) {

        var stringified = JSON.stringify(object);
        localStorage.setItem(cartId, stringified);
        return true;

    },
    getCart: function () {

        return JSON.parse(localStorage.getItem(cartId));

    },
    clearCart: function () {

        localStorage.removeItem(cartId);

    }

};

var ajaxAdapter = {

    saveCart: function (object) {

        var stringified = JSON.stringify(object);
        // do an ajax request here

    },
    getCart: function () {

        // do an ajax request -- recognize user by cookie / ip / session
        return JSON.parse(data);

    },
    clearCart: function () {

        //do an ajax request here

    }

};

var storage = localAdapter;

var helpers = {

    getHtml: function (id) {

        return document.getElementById(id).innerHTML;

    },
    setHtml: function (id, html) {

        document.getElementById(id).innerHTML = html;
        return true;

    },
    itemData: function (object) {

        var counting = object.querySelector(".counting"),
            patt = new RegExp("^[1-9]([0-9]+)?$");
        counting.value = (patt.test(counting.value) === true) ? parseInt(counting.value) : 1;

        var item = {
 
            name: object.getAttribute('data-name'),
            price: object.getAttribute('data-price'),
            id: object.getAttribute('data-id'),
            counting: counting.value,
            total: parseInt(object.getAttribute('data-price')) * parseInt(counting.value)

        };
        return item;

    },
    updateView: function () {

        var items = cart.getItems(),
            template = this.getHtml('cartT'),
            compiled = _.template(template, {
                items: items
            });
        this.setHtml('cartItems', compiled);
        this.updateTotal();

    },
    emptyView: function () {

        this.setHtml('cartItems', '<p>Cart is empty!!!</p>');
        this.updateTotal();

    },
    updateTotal: function () {

        this.setHtml('TotalPrice', cart.total + '$');

    }

};

var cart = {

    count: 0,
    total: 0,
    items: [],
    getItems: function () {

        return this.items;

    },
    setItems: function (items) {

        this.items = items;
        for (var i = 0; i < this.items.length; i++) {
            var _item = this.items[i];
            this.total += _item.total;
        }

    },
    clearItems: function () {

        this.items = [];
        this.total = 0;
        storage.clearCart();
        helpers.emptyView();

    },
    addItem: function (item) {

        if (this.containsItem(item.id) === false) {

            this.items.push({
                id: item.id,
                name: item.name,
                price: item.price,
                counting: item.counting,
                total: item.price * item.counting
            });

            storage.saveCart(this.items);


        } else {

            this.updateItem(item);

        }
        this.total += item.price * item.counting;
        this.counting += item.counting;
        helpers.updateView();

    },
    containsItem: function (id) {

        if (this.items === undefined) {
            return false;
        }

        for (var i = 0; i < this.items.length; i++) {

            var _item = this.items[i];

            if (id == _item.id) {
                return true;
            }

        }
        return false;

    },
    updateItem: function (object) {

        for (var i = 0; i < this.items.length; i++) {

            var _item = this.items[i];

            if (object.id === _item.id) {

                _item.counting = parseInt(object.counting) + parseInt(_item.counting);
                _item.total = parseInt(object.total) + parseInt(_item.total);
                this.items[i] = _item;
                storage.saveCart(this.items);

            }

        }

    }

};

document.addEventListener('DOMContentLoaded', function () {

    if (storage.getCart()) {

        cart.setItems(storage.getCart());
        helpers.updateView();

    } else {

        helpers.emptyView();

    }
    var products = document.querySelectorAll('.product button');
    [].forEach.call(products, function (product) {

        product.addEventListener('click', function (e) {

            var item = helpers.itemData(this.parentNode);
            cart.addItem(item);


        });

    });

    document.querySelector('#clear').addEventListener('click', function (e) {

        cart.clearItems();

    });


});