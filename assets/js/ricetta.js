//this is javascript for ricetta.html
//---------------------------------apply to app-------------------------------------//
$( document ).ready(function() {

  //search for a keyword
  $("#submit-btn").on("click",function(event){
        event.preventDefault();
        var userInput = $("#form-control").val().trim();
        //check user input is not a number
        if(isNaN(userInput)){
          console.log(userInput);
          // Clear localStorage
          localStorage.clear();
          // Store all content into localStorage
          localStorage.setItem("userInput", userInput);

          //navigate to navigation.html
          location.href = "navigation.html";
        }
        else{
          localStorage.clear();
          console.log("user inputted an invalid search term");
        }
  });

})
