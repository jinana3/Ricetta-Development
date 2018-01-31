//Youtube Data API: Search
function search(query){
	//empty our results div
	$('#results').empty();
	$('#buttons').empty();
	// Get input
	q = query;

	// Run GET request
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
			type: 'video',
			key: 'AIzaSyDluyRj4QxUQiXK1Zp1JQlSJxlDa9y4oGs'},
			function(data){
				console.log(data);
				//now we have data returned, need to display on screen
				$.each(data.items,function(i,item){
					//GetOuput
					var output = getOutput(item);
					//Display results
					$('#results').append(output);
				});
			}
		)
}

//Get Output
function getOutput(item){
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description  = item.snippet.description;
	var thumb = item.snippet.thumbnails.medium.url;
	var videoDate = item.snippet.publishedAt;
	var channelTitle = item.snippet.channelTitle;

	// 
	var output = '<li>' + 
				'<div class = "list-left">' +
				'<img src="'+thumb+'">' +
				'</div>' +
				'<div class ="list-right">' +
				'<h3><a href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
				'<small>By <span class="cTitle">' +channelTitle+'</span> on '+videoDate+'</small>' +
				'<p>'+description+'</p>' +
				'</div>' +
				'</li>' +
				'<div class = "clearfix"></div>' +
				'';
				return output;
}

//-----------------------------------------//
$( document ).ready(function() {
	$("#search-btn").on("click", function(event) {
		event.preventDefault();
		search($("#query").val());
	});
});
