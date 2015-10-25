// CLIENT-SIDE JAVASCRIPT
// On page load
var count = 0;
$(document).ready(function(){
	console.log('Hey, Earth!');


//Event handler for entering new item 
  $('#new-item-form').on('submit', function (event){
  	event.preventDefault();
// var item = $('#item-input').val();
		var item = $('#new-item-form').serialize();
		console.log('yo the serialized form (item) is: ', item);

  	
  	if ($('#item-input').val() !== ''){

	  	$.ajax({
	  		url: '/items', 
	  		type: 'POST', 
	  		data: item
	  	})
	  		.done(function (item){
	  			console.log("you added an new item ", item);
	  			count = item._id;
			  	console.log(count);
			  	
	  			var itemHtml = "<li class='list-group' id='" + count + "'>" + 
	  								"<div class=''>" +
	  								"<label class='checkbox-inline'>" + 
	  								"<input type='checkbox' id='checkbox' value='' name='checkbox' class='checkbox' data-id='" + count + "'></label>"
	  									+ item.name +  
	  									"<progress max='100' value='100'>" +
											"</progress>" +
											"<div class='remove-item pull-right'>" +
	  	 								"<button data-id='" + count + "' type='button' class='close'>" +
	  	 								"<i class='icon ion-ios-trash-outline'></i></button></div></div>"; 
	  	 								
	  	

					$('#list-items-ul').prepend(itemHtml);
					progressBar(item);
					$('#new-item-form')[0].reset();
					console.log("you added ", item);
			})

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

		var id = $(this).attr('data-id');
		console.log(id);

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
		//Greys out check items
		$('#' + id).toggleClass('grey');
		//adds time stamp
		$.now();
		$.get('/items/' + id + '/purchase', function (data){
		
		});
	});


//adds time to expiration from the dropdown menu 
	// $('option').on('click', function (){
	// 	var timeUntilExpiration = $(this).data('id');
	// 	console.log(timeUntilExpiration);
	// 	console.log(this);
		
	// });

	//Progress Bar functionality
	var progressBar = function (item){
		var d = new Date();
		var timeNow = d.getTime();
		console.log(timeNow);
		var progress = (100 - (item.expiresAt - timeNow)/item.shelfLife);
		$('progress').html('value', progress);

 };
	// $('progress').




});