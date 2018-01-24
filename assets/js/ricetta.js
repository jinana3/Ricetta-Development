/*var apikey = "db88af5b39df5d4f60ed1d5fa4c18f28"
var appid ="a046575d"*/

$("#submit-btn").on("click",function(event){
event.preventDefault();
var userInput = $(".form-control").val().trim();
console.log(userInput);



      // Clear localStorage
      localStorage.clear();

      // Store all content into localStorage
      localStorage.setItem("userInput", userInput);

      location.href = "navigation.html";

       /* var queryURL ="http://api.yummly.com/v1/api/recipes?_app_id="+appid+"&_app_key="+apikey+"&q=" + userInput +
        "&requirePictures=true&maxResult=10&start=10";
        console.log(queryURL);

         $.ajax({
                    url: queryURL,
                    method: 'GET'
                }).done(function(response){

        var results = response.matches;
        console.log(response);
        console.log(response.matches);*/

    /*    for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
           	var foodImage = $("<img>");

            gifDiv.prepend(foodImage);
			foodImage.attr("src", results[i].smallImageUrls[0]);
            $("#pic-appear-here").prepend(gifDiv);
          };*/


     });
