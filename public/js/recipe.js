console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  $('#recipe-search').on('click', function(event) {

  	event.preventDefault();
//clears old results
  	// $('#thumbnail').empty();
  		
  			$.get('/items', function(data){
          console.log(data);
  				// for (var i in data.data) {
  				// 	console.log(data.data[i]);
  				// 	$('#thumbnail').append("<a href='" + data.data[i].f2f_url + "'><img src='" + data.data[i].images.fixed_height.url + "'/></a>");
  				// }
  			});
  		



  	});

});
// item[i].name