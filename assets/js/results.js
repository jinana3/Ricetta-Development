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
  var url = "https://www.youtube.com/embed/" + videoId + "?enablejsapi=1";
  var width = "540";
  var height = "290";
  var frameborder = "0";

  var iframeDiv = $("<iframe id = 'player' type = 'text/html'>");
  iframeDiv.attr("src", url);
  iframeDiv.attr("width", width);
  iframeDiv.attr("height", height);
  iframeDiv.attr("frameborder", frameborder);

  $("#iframe-player").html(iframeDiv);
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

//Get Output from Video search
function getOutput(item){
  var videoId = item.id.videoId;
  var title = item.snippet.title;
  //var description  = item.snippet.description;
  var thumb = item.snippet.thumbnails.default.url;
  var videoDate = item.snippet.publishedAt;
  var channelTitle = item.snippet.channelTitle;

  // 
  var output = 
        '<div class ="video-icon" videoId = '+videoId+'>' +
        '<a videoId = '+videoId+'>' +
        '<img src="'+thumb+'">' +
        '</a>' +
        '<p>' +
        //'<h4><a href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h4>' +
        '<h4>'+title+'</h4>' +
        '<small>By <span class="cTitle">' +channelTitle+'</span> on '+videoDate+'</small>' +
        //'<p>'+description+'</p>' +
        '</p>' +
        '</div>'
        //'<div class = "clearfix"></div>' +
        ;
        return output;
}

//use Yummily API again to get specific recipe
function getRecipe(){
    var apikey = "db88af5b39df5d4f60ed1d5fa4c18f28";
    var appid = "a046575d";
    var recipe = localStorage.getItem("recipeId");
    var queryURL2 = "https://api.yummly.com/v1/api/recipe/"+recipe+"?_app_id=a046575d&_app_key=db88af5b39df5d4f60ed1d5fa4c18f28";

    $.ajax({
           url: queryURL2,
           method: 'GET'
           }).then(function(response){
                var results = response

                var gifDiv = $("<div class='item'>");
                var container = $("<a>");
                var foodImage = $("<img>");
                foodImage.attr("src", results.images[0].hostedLargeUrl);
                var foodName = results.name;
                var recipeResult = results.ingredientLines;
                var p = $("<p>").text(foodName);

                var text = $("<ul>");
                var nutrition = $("<ul>")
                nutrition.addClass("nutrition");
                for (var i=0;i<results.ingredientLines.length;i++){
                  text.append($("<li>" + results.ingredientLines[i] + "</li>"));
                }

                //matching nutrion values from response
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
                    else{
                    }
                  }
                }

                gifDiv.prepend(container);
                gifDiv.prepend(p);
                $("#searchpicture").prepend(foodImage);
                $("#nutrition").prepend(nutrition);
                $("#text").prepend(text); 
                $("#showIngredients").prepend(gifDiv);

            });
}


//---------------------------run app-------------------------------------//
$(document).ready(function() {
    //get recipe
    getRecipe();
    //run search on recipe and return results
    search(localStorage.getItem("recipeName"));
    //listener for video selected and play video
    $(document).on("click", ".video-icon", playVideo);

    //firebase
    var config = {
      apiKey: "AIzaSyDO5Q2w30esvq1RswNJgESoMwfveH6UX10",
      authDomain: "ricetta-f4fd9.firebaseapp.com",
      databaseURL: "https://ricetta-f4fd9.firebaseio.com",
      projectId: "ricetta-f4fd9",
      storageBucket: "",
      messagingSenderId: "129866802442"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    //items we want to save to database
    var recipeCol = localStorage.getItem("recipeId");
    var name = "";
    var comment = "";
      
    //add comments to firebase
    $(document).on("click","#add-comment-btn", function(event){
      event.preventDefault();

      name = $("#name").val();
      comment = $("#comment").val();
      
      database.ref().push({
        name: name,
        comment: comment,
        recipeCol: recipeCol
      });
    });

    //display comments from firebase
    database.ref().on("child_added", function(childSnapshot) {

        if (childSnapshot.val().recipeCol === recipeCol){
          var commentbox=$("<div>");
          commentbox.append(childSnapshot.val().name + ": ");
          commentbox.append(childSnapshot.val().comment);
          $(".showcomment").append(commentbox);
        }
    });

//------------------------------------closing document . ready----//
});