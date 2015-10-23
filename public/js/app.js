// CLIENT-SIDE JAVASCRIPT
// On page load
var count = 0;
$(document).ready(function(){
	console.log('Hey, Earth!');


//Event handler for entering new item 
  $('#new-item-form').on('submit', function (event){
  	event.preventDefault();
  	var item = $('#item-input').val();
  	count = count + 1;
  	
  	var itemHtml = "<li class='list-group' id='" + count + "'>" + 
  								"<div class='checkbox'>" +
  								"<label class='checkbox-inline'>" + 
  								"<input type='checkbox' id='checkbox' value='' name='checkbox' class='checkbox' data-id='" + count + "'></label>"
  									+ item +  
  									"<progress max='100' value='50'>" +
										"</progress>" +
										"<div class='remove-item pull-right'>" +
  	 								"<button data-id='" + count + "' type='button' class='close'>" +
  	 								"<i class='icon ion-ios-trash-outline'></button></div></div>"; 
  	 								
  	if (item !== ''){

			$('#list-items-ul').prepend(itemHtml);
			$('#new-item-form')[0].reset();
				console.log("you added " + item);
		} else {
			console.log("your form is blank");
		}
	});


	//event handler for getting data from the dropdown

	$('.dropdown-menu li').on('click', function () {
		$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
  	$(this).parents(".dropdown").find('.btn').val($(this).data('value'));
	});




	//delete items from list
	$('#list-items-ul').on('click', '.close', function (event){
		event.preventDefault();
		console.log(this);
		var id = $(this).attr('data-id');
		$('#' + id).remove();
	});


	//Greys out check items
	$('#list-items-ul').on('click', '.checkbox', function (){
		var id = $(this).attr('data-id');
		$('#' + id).toggleClass('grey');
	});

  	//before serialize 
  	//get value of bootstrap dropdown
  	//save value into value of hidden form field
  	// finally serialize the form



  	
  	
  	
  	// $.ajax({
  	// 	url: '/items', 
  	// 	type: 'POST', 
  	// 	data: item
  	// })
  	// 	.done(function (data){
  	// 		console.log("you added an new item ", data);
  	

  	// 	})
  	// 		.fail(function (data){
  	// 			console.log("item was not added");
  	// 		});
  		
  	




  

});