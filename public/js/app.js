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

  	
  	if ($('#item-input').val() !== ''){

	  	$.ajax({
	  		url: '/items', 
	  		type: 'POST', 
	  		data: item
	  	})
	  		.done(function (item){
	  			count = item._id;
			  	
	  			var itemHtml = "<li class='list-group' id='" + count + "'>" + 
	  								"<div class=''>" +
	  								"<label class='checkbox-inline'>" + 
	  								"<input type='checkbox' id='checkbox' value='' name='checkbox' class='checkbox' data-id='" 
	  								+ count + "'></label>"
	  								+ item.name +  
	  								"<progress max='100' value='0'>" +
										"</progress>" +
										"<div class='remove-item pull-right'>" +
	  	 							"<button data-id='" + count + "' type='button' class='close'>" +
	  	 							"<i class='icon ion-ios-trash-outline'></i></button></div></div>"; 
	  	 								
	  	

					$('#list-items-ul').prepend(itemHtml);
					
					$('#new-item-form')[0].reset();
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
		$('progress').attr('value', 100);
		//adds time stamp
		$.now();
		$.get('/items/' + id + '/purchase', function (data){
		
	// 	});
	// });
	// 	$.ajax({
	// 		url: '/items/' + id + '/purchase', 
	// 		type: 'POST'
	// 		// data: item._id.purchase
	// 	})
	// 		.done( function (data) { 
	// 	$('#' + id).toggleClass('grey');
	
		// FIXME: what is this for? do we need it?
		// var progressBar = function (item){
		// 	console.log('in the progressBar function');
		// 	var d = new Date();
		// 	var timeNow = d.getTime();
		// 	console.log(timeNow);
		// 	var progress = 100 * ((item.expiresAt - timeNow)/item.shelfLife);
		// 	$('progress').attr('value', progress);
		// };
	

	// })
	// 		.fail( function (data) {
	// 			console.log('the data was: ' , data);

		});
	});		

});
//Checkboxes to remained checked after refresh
	// $('.checkbox').on('change', function (){
	// 	var checkboxValues = {};
	// 	$('.checkbox').each(function (){
	// 		checkboxValues[this.id] = this.checked;
	// 	});
		
	// 	$.cookie('checkboxValues', checkboxValues, { expires: 365, path: '/'});
	// });

	// function repopulateCheckboxes(){
	// 	var checkboxValues = $.cookie('checkboxValues');
	// 	if (checkboxValues) {
	// 		Object.keys(checkboxValues).forEach(function (element){
	// 			var checked = checkboxValues[element];
	// 			$('#' + element).prop('checked', checked);
	// 		});
	// 	}
	// }
	// $.cookie.json = true;
	// repopulateFormElements();
	
	






