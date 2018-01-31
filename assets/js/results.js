//uses firebase
//uses Yummily api
//uses youtube iframe api
//uses data api

//create  iframe tag to play youtube video selected, and isembedded on  webpage
// <iframe id="player" type="text/html" width="540" height="290"
//   src="http://www.youtube.com/embed/bHQqvYy5KYo?enablejsapi=1&origin=http://example.com"
//   frameborder="0">
// </iframe>
function playVideo(){
  var videoId = $(this).attr("videoId");
  var url = "http://www.youtube.com/embed/" + videoId + "?enablejsapi=1";
  var width = "540";
  var height = "290";
  var frameborder = "0";

  var iframeDiv = $("<iframe id = 'player' type = 'text/html'>");
  iframeDiv.attr("src", url);
  iframeDiv.attr("width", width);
  iframeDiv.attr("height", height);
  iframeDiv.attr("frameborder", frameborder);

  $("#iframe-player").append(iframeDiv);
}

//function that search key word in youtube and returns list of results
function search(query){
  //empty our results div
  $('#results').empty();
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
  //var description  = item.snippet.description;
  var thumb = item.snippet.thumbnails.default.url;
  var videoDate = item.snippet.publishedAt;
  var channelTitle = item.snippet.channelTitle;

  // 
  var output = '<li videoId = '+videoId+'>' + 
        '<div class = "list-left">' +
        '<img src="'+thumb+'">' +
        '</div>' +
        '<div class ="list-right" videoId = '+videoId+'>' +
        //'<h4><a href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h4>' +
        '<h4>'+title+'</h4>' +
        '<small>By <span class="cTitle">' +channelTitle+'</span> on '+videoDate+'</small>' +
        //'<p>'+description+'</p>' +
        '</div>' +
        '</li>' +
        '<div class = "clearfix"></div>' +
        '';
        return output;
}




//---------------------------run app-------------------------------------//
$(document).ready(function() {
    search(localStorage.getItem("recipeName"));
    $(document).on("click", ".list-right", playVideo);


//----------------------------Daniels unfunctionized code-----------------//
//add a click event
$("#submit-btn").on("click",function(event){
	location.href = "ricetta.html";
});


var apikey = "db88af5b39df5d4f60ed1d5fa4c18f28"
var appid ="a046575d"
var recipe = localStorage.getItem("recipeId")
var queryURL2= "http://api.yummly.com/v1/api/recipe/"+recipe+"?_app_id=a046575d&_app_key=db88af5b39df5d4f60ed1d5fa4c18f28";

$.ajax({
       url: queryURL2,
       method: 'GET'
       }).done(function(response){
            var results = response
            console.log(response);

            var gifDiv = $("<div class='item'>");
             //var imageBox = $("div");
             //var nutritionBox =$("div");
             //var ingredientBox=$("div");
            var container = $("<a>");
           	var foodImage = $("<img>");
           	foodImage.attr("src", results.images[0].hostedLargeUrl);
           
           	var foodName = results.name;
           	console.log(foodName)
           	var recipeResult = results.ingredientLines;

           	var text = $("<ul>");
           	var nutrition = $("<ul>")
           	nutrition.addClass("nutrition");
           	for (var i=0;i<results.ingredientLines.length;i++){
           		text.append($("<li>" + results.ingredientLines[i] + "</li>"));
           	}

           	if (results.nutritionEstimates === undefined){
           	}
           	else{
           		
				    for(var i=0; i < results.nutritionEstimates.length - 1;i++){
	
  					if(results.nutritionEstimates[i].attribute && results.nutritionEstimates[i].attribute === "ENERC_KCAL"){
  					nutrition.append($("<li>" + "Calories : " + results.nutritionEstimates[i].value+ "</li>"));

  					}
  					
  					if(results.nutritionEstimates[i].attribute && results.nutritionEstimates[i].attribute === "CHOCDF"){
  					nutrition.append($("<li>" + "Total Carbohydrate : " + results.nutritionEstimates[i].value+"g" + "</li>"));

  					}
  					if(results.nutritionEstimates[i].attribute && results.nutritionEstimates[i].attribute === "FAT"){
  					nutrition.append($("<li>" +  "Total Fat : " + results.nutritionEstimates[i].value+"g" + "</li>"));

  					}
  					if(results.nutritionEstimates[i].attribute && results.nutritionEstimates[i].attribute === "PROCNT"){
  					nutrition.append($("<li>" + "Protein : " + results.nutritionEstimates[i].value +"g" + "</li>"));

  					}
  					
  					if(results.nutritionEstimates[i].attribute && results.nutritionEstimates[i].attribute === "SUGAR"){
  					nutrition.append($("<li>" + "Total Sugar : " + results.nutritionEstimates[i].value +"g" + "</li>"));

  					}
  					
  					if(results.nutritionEstimates[i].attribute && results.nutritionEstimates[i].attribute === "NA"){
  					nutrition.append($("<li>" + "Sodium : " + results.nutritionEstimates[i].value +"g" + "</li>"));
  				}
  					else{};

  				}
             	}

          	console.log(results.ingredientLines[0])
            var p = $("<p>").text(foodName);
            gifDiv.prepend(container);
           // gifDiv.prepend(text);
			     //gifDiv.prepend(nutrition);

      			//gifDiv.prepend(foodImage);
      			gifDiv.prepend(p);
      			$("#searchpicture").prepend(foodImage);
      			$("#nutrition").prepend(nutrition);
      			$("#text").prepend(text);
             
   
              $("#showIngredients").prepend(gifDiv);

        });


var config = {
		apiKey: "AIzaSyBrNWbIXP9hccU1MO0CgkPX-5aP2tlwkmU",
		authDomain: "comment-ddf73.firebaseapp.com",
		databaseURL: "https://comment-ddf73.firebaseio.com",
		projectId: "comment-ddf73",
			 storageBucket: "",
		messagingSenderId: "284278290092"
		};
firebase.initializeApp(config);
var database = firebase.database();

var name ="";
var comment = "";
  
$(document).on("click","#submit-btn", function(event){
  event.preventDefault();

  name = $("#name").val();
  console.log(name)
comment = $("#comment").val();
  console.log(comment);
  
  database.ref().push({
    name: name,
    comment: comment,
   
  });


});

database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().comment);

    var commentbox=$("<div>");
    commentbox.append(childSnapshot.val().name + ": ");
    commentbox.append(childSnapshot.val().comment);
    $(".showcomment").append(commentbox);
});
//star rating

function StarRating() {
this.init();
};

/**
* Initialize
*/
StarRating.prototype.init = function() {
this.stars = document.querySelectorAll('#rating span');
for (var i = 0; i < this.stars.length; i++) {
  this.stars[i].setAttribute('data-count', i);
  this.stars[i].addEventListener('mouseenter', this.enterStarListener.bind(this));
}
document.querySelector('#rating').addEventListener('mouseleave', this.leaveStarListener.bind(this));
};

/**
* This method is fired when a user hovers over a single star
* @param e
*/
StarRating.prototype.enterStarListener = function(e) {
this.fillStarsUpToElement(e.target);
};

/**
* This method is fired when the user leaves the #rating element, effectively removing all hover states.
*/
StarRating.prototype.leaveStarListener = function() {
this.fillStarsUpToElement(null);
};

/**
* Fill the star ratings up to a specific position.
* @param el
*/
StarRating.prototype.fillStarsUpToElement = function(el) {
// Remove all hover states:
for (var i = 0; i < this.stars.length; i++) {
  if (el == null || this.stars[i].getAttribute('data-count') > el.getAttribute('data-count')) {
    this.stars[i].classList.remove('hover');
  } else {
    this.stars[i].classList.add('hover');
  }
}
};

// Run:
new StarRating();


//------------------------------------closing document . ready//
});