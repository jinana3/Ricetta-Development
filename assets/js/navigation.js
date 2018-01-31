//here we use Yummily API to retrive info on search term
function getInfo() {
    var apikey = "db88af5b39df5d4f60ed1d5fa4c18f28"
    var appid = "a046575d"
    var userInput = localStorage.getItem("userInput")
    var queryURL = "http://api.yummly.com/v1/api/recipes?_app_id="+appid+"&_app_key="+apikey+"&q=" + userInput +
            "&requirePictures=true&maxResult=10&start=10";

    $.ajax({
             url: queryURL,
             method: 'GET'
            }).then(function(response){

        //save response matches on search term
        var results = response.matches;
        //loop through results to populate html with images and recipe titles
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
            //container can store the image tag as well as store an attribute href
            var container = $("<a>");
           	var foodImage = $("<img>");

            var foodName = results[i].recipeName;
            var recipeId = results[i].id;
            //save recipeId in tag for recipe search in next page
            foodImage.attr("recipeId", recipeId);
            foodImage.attr("recipeName", foodName);
            //add link to photo to image tag
            foodImage.attr("src", results[i].imageUrlsBySize[90]);
            //give image tag a class for click function later
            foodImage.addClass("imagelink");
           	
            //put everything on the screen
            var p = $("<p>").text(foodName);
            container.prepend(foodImage);
            gifDiv.prepend(container);
            gifDiv.prepend(p);
            $("#pic-appear-here").prepend(gifDiv);

            //every container will have the link to the next page
            container.attr("href","results.html");      
          };

    });
}

//when a recipe is chosen, function to store the information of that recipe
function storeId(){
    localStorage.setItem("recipeId", $(this).attr("recipeId"));
    localStorage.setItem("recipeName", $(this).attr("recipeName"));
    //the container href attribute will take user to next page
}

//---------------------------------apply to app-------------------------------------//

$( document ).ready(function() {
  //display the search term results
  getInfo();
  //Adding a click event listener to all elements with a class of "imagelink"
  //onclick the recipe and it takes to the results page
  //it also stores the recipe name in the local page 
  //third page it will take the api call and pull the recipe
  $(document).on("click", ".imagelink", storeId);
});