//here we use Yummily API to retrive info on search term
function getInfo() {
    var apikey = "db88af5b39df5d4f60ed1d5fa4c18f28"
    var appid = "a046575d"
    var userInput = localStorage.getItem("userInput")
    var queryURL = "https://api.yummly.com/v1/api/recipes?_app_id="+appid+"&_app_key="+apikey+"&q=" + userInput +
            "&requirePictures=true&maxResult=12&start=10";
    $.ajax({
             url: queryURL,
             method: 'GET'
            }).then(function(response){

        //save response matches on search term
        var results = response.matches;
        //loop through results to populate html with images and recipe titles
        for (var i = 0; i < results.length; i++) {
            var foodName = results[i].recipeName;
            var recipeId = results[i].id;
            getPhoto(recipeId, foodName);
          }; 

    });
}

//getting a larger photo from another API call
function getPhoto(recipeImage, recipeName){
        var queryURL2 = "https://api.yummly.com/v1/api/recipe/"+recipeImage+"?_app_id=a046575d&_app_key=db88af5b39df5d4f60ed1d5fa4c18f28";
        $.ajax({
                url: queryURL2,
                method: 'GET'
              }).then(function(response){
                var results2 = response;
                var image2 = {
                  recipeName: recipeName,
                  recipeId: recipeImage,
                  image: results2.images[0].hostedLargeUrl
                  };
                //var test = results2.images[0].hostedLargeUrl;
                callBack(image2);
                })
}

//CallBack function to overcome asynchronous run when ajax is called
//would like to store objects into an array
function callBack(object) {
    //do something with your parameter
    printImage(object);
};

function printImage(object){
            var gifDiv = $("<div class='item'>");
            //container can store the image tag as well as store an attribute href
            var container = $("<a>");
            var foodImage = $("<img>");

            var foodName = object.recipeName;
            var recipeId = object.recipeId;
            
            console.log(object.image);
            //save recipeId in tag for recipe search in next page
            foodImage.attr("recipeId", recipeId);
            console.log(recipeId);
            foodImage.attr("recipeName", foodName);
            //add link to photo to image tag
            foodImage.attr("src", object.image);
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