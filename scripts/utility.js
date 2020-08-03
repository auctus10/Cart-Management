// Globals
var allItems = [];
var cartItems = [];
if (localStorage.getItem('allItems') !== null) {
    allItems = JSON.parse(localStorage.getItem('allItems'));
}
if (localStorage.getItem('cartItems') !== null) {
    cartItems = JSON.parse(localStorage.getItem('cartItems'));
}

// Function to hard save allItems in localstorage
function saveItem() {
    localStorage.setItem('allItems', JSON.stringify(allItems));
}

function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to genrate RFC version 4 complient UNIQUE IDS
function genUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Return Item Template
function itemTemplate(item) {
    var template =  '<div class="item clearfix">' +
                        '<img src="' + item.imageUrl + '" alt="">' +
                        '<h3>' + item.title + '</h3>' +
                        '<p class="description">' + item.description + '</p>' +
                        '<p>' +
                            '<span class="label">Category</span>' +
                            '<span class="value">' + item.category + '</span>' +
                        '</p>' +
                        '<p>' +
                            '<span class="label">Memory</span>' +
                            '<span class="value">' + item.memory + '</span> GB' +
                        '</p>' +
                        '<p>' +
                            '<span class="label">Price</span><i class="fas fa-rupee-sign"></i>' +
                            '<span class="value">' + item.price + '</span>' +
                        '</p>' +
                    '</div>';

    return $.parseHTML(template);
}