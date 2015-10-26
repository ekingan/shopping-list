function toggleLoggedin() {
	$('#login-modal').modal('hide');
	$('.not-logged-in').hide();
}

function checkAuth() {
	$.get('/current-user', function (data) {
		if(data.user) {
			toggleLoggedin();

		} else{
			
		}
	});
}



$(document).ready(function (){
//checks if user is logged in
	checkAuth();
	//Sign in as guest
$('#guest').click(function (event) {
	event.preventDefault();
	$.post('/guest', user , function (data) {

	});

});
//gets new user on signup
	$('#signup-form').submit(function (event){
			event.preventDefault();
			var user = $(this).serialize();

			$.post('/users', user, function (data){
				console.log(data);
				$('.not-logged-in').modal('hide');
				$('.not-logged-in').hide();
			});  

	});
	//log in form
	$('#login-form').submit(function (event) {
		event.preventDefault();
		$(this).focus();
		var user = $(this).serialize();

		$.post('/login', user, function (data) {
			
			if (data.err) {	
				console.log(data.err);
				$('.collapse').show();
				$('#login-form')[0].reset();
				 
				// $('#toast').text(data.err).addClass('alert-danger').show();
			} else {
				toggleLoggedin();
				$('#login-form').val('');
				window.location.reload();
			}
		});
	});

	//logs user out
	$('#logout').click(function (event) {
		event.preventDefault();

		$.get('/logout', function (data){
			console.log(data.msg);
			$('.not-logged-in').show();
			window.location.reload();

			

		});
	});

});