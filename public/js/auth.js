$(document).ready(function (){
//checks if user is logged in
	function checkAuth() {
		$.get('/current-user', function (data) {
			if(data.user) {
				$('.not-logged-in').modal('hide');
				$('.not-logged-in').hide();
			} else{
				console.log("that user does not exist!");
				
			}
		});
	}
	checkAuth();
	

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
		var user = $(this).serialize();

		$.post('/login', user, function (data){
			checkAuth(data);

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