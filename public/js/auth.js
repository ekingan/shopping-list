function toggleLoggedin() {
	$('#login-modal').modal('hide');
	$('.not-logged-in').hide();
	$('.logged-in').show();
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
	$('#email').focus();
	$('.logged-in').hide();
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
				window.location.reload();
			});  

	});
	//log in form
	$('#login-form').submit(function (event) {
		event.preventDefault();
		var user = $(this).serialize();

		$.post('/login', user, function (data) {
			
			if (data.error) {	
				console.log(data.err);
				$('.collapse').show();
				$('#login-form')[0].reset();
				 //how to make error if bad password?
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