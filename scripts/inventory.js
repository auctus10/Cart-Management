
// Inventory form submit
$('#formSubmit').on('click', function (e) {
    // if($(this).attr('value')==='Add Item'){
        console.log($(this).attr('value'));
        e.preventDefault();
        var item = {},
            error = [];


        // Remove errors if any
        $('.error').remove();

        $('.dataField').each(function () {
            var type = $(this).attr('type'),
                name = $(this).attr('name'),
                placeholder = $(this).attr('placeholder');

            if (this.value !== '') {
                if (type !== 'radio' && type !== 'checkbox') {
                    item[name] = this.value;
                } else {
                    (this.checked) ? item[name] = this.value: false;
                }
            } else {
                error.push('<p class="error" name=' + name + '>' + placeholder +
                    ' cannot be empty.</p>')
            }
        });

        if (!error.length) {

            if($(this).attr('value')==='Add Item'){
                item.id = genUID();
                allItems.push(item);
            } else {
                var id = $(this).attr('item-id'),
                    index =  allItems.findIndex(function (x) {
                        return (x.id === id) ? true : false;
                    });

                item.id = allItems[index].id;
                allItems[index] = item;
            }
            saveItem();
            printItems();
            e.target.parentElement.reset();
        } else {
            error.forEach(function (val) {
                var name = $(val).attr('name');
                $(val).insertAfter('[name="' + name + '"]');
            });
        }


});

// Display items in inventory
function printItems() {
    $('#item_list').html('');
    allItems.forEach(function (item) {
        
        var template =  itemTemplate(item),
            button =    '<button class="edit button primary" item-id="' + item.id + '">' +
                            '<i class="fas fa-edit"></i> Edit' +
                        '</button>' +
                        '<button class="delete button danger" item-id="' + item.id + '">' +
                            '<i class="fas fa-trash"></i> Delete' +
                        '</button>';

        $(template).append(button);

        $('#item_list').append(template);
    });
}

printItems();


// Delete Items from inventory
$(document).on('click', '.delete', function () {
    var id = $(this).attr('item-id'),
        index = allItems.findIndex(function (item) {
            return (item.id === id) ? true : false;
        });

    if (confirm('Are you sure ?')) {
        allItems.splice(index, 1);
        saveItem();
        printItems();
    }
});


//Edit items from inventory
$(document).on('click', '.edit', function () {
    var id = $(this).attr('item-id'),
        item = allItems.find(function (item) {
            return (item.id === id) ? true : false;
        });



        Object.keys(item).forEach(function (key) {

            var field = $('form [name="' + key + '"]'),
                fieldType = field.attr('type');

            if (field) {
                if (fieldType !== 'radio' && fieldType !=='checkbox') {
                    field.val(item[key]);
                } else {
                    field.each(function () {
                        if (this.value === item.memory) {
                            $(this).prop('checked', true);
                        }
                    });
                }
            }
        });


        $('#pageContent').scrollTop(0);

        $('#formSubmit').attr('data-func', 'edit').attr('value', 'Edit Item').attr('item-id', id);


});


