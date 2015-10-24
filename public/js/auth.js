$(document).ready(function (){
	$('#signup-form').submit(function (event){
			event.preventDefault();
			var user = $(this).serialize();

			$.post('/users', user, function (data){
				console.log(data);
			});

	});


});