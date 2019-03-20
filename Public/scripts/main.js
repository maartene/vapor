var $ = window.jQuery;

$('#newTodoForm').on('submit', function(event) {
    console.log('submitted');
    event.preventDefault();
                     
    var newTodo = $('#newTodoTitle').val();
    console.log('adding new item: '+newTodo);  
    addItem($('#newTodoForm').serialize());
                     });

function addItem(item) {
    console.log('adding item: '+item);
    
    $.post('api/todos', item, function(data) {
        console.log('succesfully added item '+data);
        var $newTodoItem = $('<li>'+data.title+
            ' <button onClick="removeItem('+data.id+')">Delete</button></li>');
        $newTodoItem.addClass('list-group-item');
        $('#todosList').append($newTodoItem);
           });
}

function removeItem(id) {
    console.log('deleting item '+id);
    
    $.ajax({
        url: '/api/todos/'+id,
        type: 'DELETE',
        success: function(result) {
            console.log('succesfully deleted item '+id);
            $('#todoItem'+id).hide();
        }
    });
}
