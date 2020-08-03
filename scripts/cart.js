function printItems() {
    $('#item_list').html('');
    cartItems.forEach(function (item) {
        
        var template =  itemTemplate(item),
            button =    '<p>' +
                            '<span class="label">Quantity</span>' +
                            '<span class="value">' + '1' + '</span>' +
                        '</p>' +
                        '<button class="delete button danger" item-id="' + item.id + '">' +
                            '<i class="fas fa-trash"></i> Remove from Cart' +
                        '</button>';

        $(template).append(button);

        $('#item_list').append(template);
    });
}

printItems();

$(document).on('click', '.delete', function () {
    var id = $(this).attr('item-id'),
        index = cartItems.findIndex(function (item) {
            return (item.id === id) ? true : false;
        });

    if (confirm('Are you sure ?')) {
        cartItems.splice(index, 1);
        saveCart();
        printItems();
    }
});