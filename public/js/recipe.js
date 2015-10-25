console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  $('#recipe-search').on('click', function(event) {

  	event.preventDefault();

  	$('#results').empty();

  	var recipeSearch = //items from db
  	$.get('http://food2fork.com/api/search?key=key&q=' + shredded+ '%20' + chicken, function(data){
  		console.log(data.data);

  		for (i in data.data) {
  			console.log(data.data[i]);
  			$('#results').append("<img src='" + data.data[i].images.fixed_height.url + "'/>");
  		}
  	});



  });

});
