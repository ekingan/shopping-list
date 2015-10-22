// CLIENT-SIDE JAVASCRIPT
// On page load
$(document).ready(function(){
	console.log('Hey, Earth!');

  $('#new-item-form').on('submit', function (event){
  	event.preventDefault();
  	var item = $(this).serialize();
  	$('ul').prepend(item);
  	$.ajax({
  		url: '/items', 
  		type: 'POST', 
  		data: item
  	})
  		.done(function (data){
  			console.log("you added an new item ", data);

  			var itemHtml = "<li class=''>" + data.name + 
  			"<span data-id='" + data._id + "' class='close delete'>x</span></li>"; 

  			$('#list-items').prepend(itemHtml);
  			$('#new-item-form')[0].reset();

  		})
  			.fail(function (data){
  				console.log("item was not added");
  			});
  		
  	});




  

});