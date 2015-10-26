console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  $('#recipe-search').on('click', function(event) {

  	event.preventDefault();
//clears old results
  	$('#results').empty();
  		
  			$.get('http://food2fork.com/api/search?key=key&q=' + chocolate , function(data){
  				for (var i in data.data) {
  					console.log(data.data[i]);
  					$('#results').append("<a href='" + data.data[i].f2f_url + "'><img src='" + data.data[i].images.fixed_height.url + "'/></a>");
  				}
  			});
  		



  	});

});
// item[i].name