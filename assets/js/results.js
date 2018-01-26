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
            var container = $("<a>");
           	var foodImage = $("<img>");
           	foodImage.attr("src", results.images[0].hostedLargeUrl);
           
           	var foodName = results.name;
           	console.log(foodName)
           	var recipeResult = results.ingredientLines;

           	
           	var text = $("<ul>");
           	for (var i=0;i<results.ingredientLines.length;i++){
           		text.append($("<li>" + results.ingredientLines[i] + "</li>"));
           	}
           	console.log(results.ingredientLines[0])
            


            var p = $("<p>").text(foodName);
            
            gifDiv.prepend(container);
            
            gifDiv.prepend(text);
			gifDiv.prepend(foodImage);
			gifDiv.prepend(p);
           
           
            $("#showIngredients").prepend(gifDiv);





             });