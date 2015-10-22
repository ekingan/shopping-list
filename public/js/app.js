// CLIENT-SIDE JAVASCRIPT
// On page load
$(document).ready(function(){
	console.log('Hey, Earth!');


//Event handler for entering new item 
  $('#new-item-form').on('submit', function (event){
  	event.preventDefault();
  	var item = $('#item-input').val();
  	
  	var itemHtml = "<li class=''>" + 
  								"<div class='radio'>" +
  								"<label class='radio-inline'>" + 
  								"<input type='radio' value='' name='' data-id=''></label>"
  									+ item + 
  									"<progress max='100' value='50'>" +
  									"<strong> 50% done.</strong>" +
										"</progress>" +
  	 								"<span data-id='" + //data._id 
  	 								"' class='close delete'>x</span></li>"; 
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