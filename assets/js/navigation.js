var apikey = "db88af5b39df5d4f60ed1d5fa4c18f28"
var appid ="a046575d"
var userInput = localStorage.getItem("userInput")
console.log(userInput);

var queryURL ="http://api.yummly.com/v1/api/recipes?_app_id="+appid+"&_app_key="+apikey+"&q=" + userInput +
        "&requirePictures=true&maxResult=10&start=10";



console.log(queryURL);

    $.ajax({
             url: queryURL,
             method: 'GET'
            }).done(function(response){

        var results = response.matches;
        console.log(response.matches);


        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
            var container = $("<a>");
           	var foodImage = $("<img>");
            var recipeId= results[i].id;
            foodImage.attr("recipeId", recipeId);
           	var foodName = results[i].recipeName;
            var p = $("<p>").text("I am craving " + foodName);
            gifDiv.prepend(container);
            gifDiv.prepend(p);
            container.prepend(foodImage);
			     foodImage.attr("src", results[i].imageUrlsBySize[90]);
           foodImage.addClass("imagelink");
           //localStorage.setItem("recipe", results[i].ingredients.recipeName);
            container.attr("href","results.html");
            $("#pic-appear-here").prepend(gifDiv);
          
          };
        $(".imagelink").on("click",function(response){
          localStorage.setItem("recipeId", $(this).attr("recipeId"));
          console.log(recipeId);




          });



    });


            //onclick the recipe and it takes to the results page
            //it also stores the recipe name in the local page 
            //third page it will take the api call and pull the reciple
            //it will take the 