console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  $('#recipeSearchBtn').on('click', function(event) {

  	event.preventDefault();
//send you to recipe.ejs template

//clear recipe page
  	// $('#thumbnail').empty();
  		
  			$.ajax({
          url: '/recipe',
          type: 'GET', 
        })
        .done(function(data){
          // window.location.href = "/recipe";
          console.log(data);
        })
        .fail(function(data){
          console.log("get request to server failed");
        });


  	});

});
