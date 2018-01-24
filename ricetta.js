var apikey = "db88af5b39df5d4f60ed1d5fa4c18f28"
var appid ="a046575d"
var userInput;




$("#submit-btn").on("click",function(event){
event.preventDefault();
userInput = $(".form-control").val().trim();
console.log(userInput)






});




var queryURL ="http://api.yummly.com/v1/api/recipes?_app_id="+appid+"&_app_key="+apikey+"&q=" + userInput +
"&requirePictures=true&maxResult=10&start=10";

 $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response){


console.log(response);


        });