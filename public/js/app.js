// CLIENT-SIDE JAVASCRIPT
// On page load
var count = 0;
$(document).ready(function(){
	console.log('Hey, Earth!');


//Event handler for entering new item 
// When a new item is entered
  $('#new-item-form').on('submit', function (event){
  	event.preventDefault();
// var item = $('#item-input').val();
		//Create new serialized item
		var item = $('#new-item-form').serialize();
		console.log("this is the serialized item: " + item);

  	// Keeps from submitting blank forms
  	if ($('#item-input').val() !== ''){
  		//post item
 		 	$.ajax({
	  		url: '/items', 
	  		type: 'POST', 
	  		data: item
	  	})
	  	// if successful
	  		.done(function (item){
	  			// set count equal to item id
	  			count = item._id;
			  	//this is what appears on page
	  			var itemHtml = "<li class='list-group' id='" + count + "'>" + 
	  								"<div>" +
	  								"<label class='checkbox-inline'>" + 
	  								"<input type='checkbox' id='" + count + "' value='' name='checkbox' class='checkbox' data-id='" 
	  								+ count + "'></label>" + item.name +  
	  								"<progress max='100' value='0' data-id='" + count + "'></progress>" +
										"<div class='remove-item pull-right'>" +
	  	 							"<button data-id='" + count + "' type='button' class='close'>" +
	  	 							"<i class='icon ion-ios-trash-outline'></i></button></div></div></li>"; 
	  	 		// post to page at top of page					
					$('#list-items-ul').prepend(itemHtml);
					//reset form
					$('#new-item-form')[0].reset();
			})
	  		//this is what happens when it fails to post
				.fail(function (data){
 					console.log("item was not added");
  		});
		

		} else {
				console.log("your form is blank");
			}
		
		});


	//event handler for changing selection displayed on dropdown
	$('.dropdown-menu li').on('click', function () {
		$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
  	$(this).parents(".dropdown").find('.btn').val($(this).data('value'));
	});


	//delete items from list
	$('#list-items-ul').on('click', '.close', function (event){
		event.preventDefault();
		//finds item to delete by id
		var id = $(this).attr('data-id');
		console.log(id);
//delete request
			$.ajax({
			url: '/items/' + id,
			type: 'DELETE',
		})
			.done(function (data){
				 console.log("deleting ", data);
				 $('#' + id).remove();

			})
			.fail(function (data) {
				console.log("failed to delete ", data);
			});
	});

//Event handler for checkbox
	$('#list-items-ul').on('click', '.checkbox', function (){
		
		var id = $(this).attr('data-id');
		console.log("this is : " , $(this));
		console.log("this is the id of this: " , id);	
			
					$('progress[data-id = ' + id + ']').attr('value', '100');
					$.now();
					$.get('/items/' + id + '/purchase', function (data){

						var checkedItem = $('#' + data._id);
						$('#' + id).toggleClass('grey');
						sortItems(checkedItem);

						if (!data.purchasedAt) {
							$('progress[data-id = ' + id + ']').attr('value', '0');
							$('#list-items-ul').prepend(data);

							// var something = $('#' + data._id);
							// $('#' + id).toggleClass('grey');
							// sortItems(something);
							// if (!data.purchasedAt) {
							// 	$('progress[data-id = ' + id + ']').attr('value', '0');
							// 	$("#list-items-ul").prepend(data);
							// 	console.log(data);

							// }
						}
				});
				

	});


//Sort checked and un-checked grocery items
var sortItems = function(checkedItem){
	if ((checkedItem).hasClass('grey')){
		$('#list-items-ul').append(checkedItem);
	} else {
		$('#list-items-ul').prepend(checkedItem);
	}
};

// sortItems();

$('#back').on('click', function (event) {
	event.preventDefault();
	location.href="/";

});
			


});
		



