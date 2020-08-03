function printItems(itemCollection) {
    $('#item_list').html('');
    (itemCollection === undefined) ? itemCollection = allItems : null;
    itemCollection.forEach(function (item) {
        var template =  itemTemplate(item),
            button =    '<button class="cart button success" item-id="' + item.id + '">' +
                            '<i class="fas fa-shopping-cart"></i> Add to Cart' +
                        '</button>';

        $(template).append(button);
        $('#item_list').append(template);
    });
}

printItems();

$('#search').on("keyup", function () {
    var searchText = $('input').val().trim().toLowerCase(),
        filteredItems = allItems.filter(function (item) {

            var found = false;

            Object.keys(item).forEach(function(val) {

                var searchFrom = item[val].toLowerCase();

                if (searchFrom.indexOf(searchText) > -1) {
                    found = true;
                }

            });

            return found;
        });


    printItems(filteredItems);

});

$(document).on('click', '.cart', function () {
   var id = $(this).attr("item-id");
   allItems.forEach(function(item){
       if(item.id === id){
           cartItems.push(item);
           saveCart();
       }
   })
});