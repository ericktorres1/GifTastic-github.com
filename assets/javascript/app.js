$(document).ready(function(){

var foods = ["tacos", "chicken", "pizza", "sushi"];


function displayFood() {
    $('#food-view').empty();
    var food = $(this).attr("data-name");

    // var queryURL = "http://api.giphy.com/v1/gifs/search?q=pizza&api_key=kSK6li9wL7isiktdOKYY4wmU7Grnmpbi&limit=10";
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + food +  "&api_key=kSK6li9wL7isiktdOKYY4wmU7Grnmpbi&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            
            var foodDiv = $("<div class='food'>");

            var gifs = response.data;
            var ratings = []; 
            var imageGIF = [];
            var imageFixed = [];

            for(var i = 0; i < gifs.length; i++) {
                ratings.push(gifs[i].rating);
                imageGIF.push(gifs[i].images.fixed_height_still.url);
                imageFixed.push(gifs[i].images.fixed_height.url);
                
            }
            for(var j = 0; j < ratings.length; j++){
                var rating = "<div class='ratings'> Rating: " + ratings[j] + " </div>";
                
                var imageURL = imageGIF[j];
                var imageFixedURL = imageFixed[j];
                var gif = rating + '<img src=" ' + imageURL + '" data-still=" ' + imageURL + ' " data-animate=" ' + imageFixedURL + '" data-state="still" class="moveImage">';

                gif = '<div class="col-md-4 float-left">' + gif + "</div>";
               

                $("#food-view").append(gif); 
            }
            
            $('.moveImage').on('click', function(){
                var state = $(this).attr('data-state');
                if(state === 'still') {
                    $(this).attr('src', $(this).attr('data-animate'));
                    $(this).attr('data-state', 'animate');
                }
                else {
                    $(this).attr('src', $(this).attr("data-still"));
                    $(this).attr('data-state', 'still');
                }
            });
    });

}

function renderButtons() {
    $("#buttons-view").empty();

    for(var i = 0; i < foods.length; i++){
        
        var button =$("<button class='btn btn-primary'>");
        button.addClass("food-btn");
        button.attr("data-name", foods[i]);
        button.text(foods[i]);
        $("#buttons-view").append(button);
    }
}

function clearFood() {
    $("#food-view").empty();
}

    $("#add-food").on("click", function(event) {
    event.preventDefault();

    var food = $("#food-input").val().trim();

    foods.push(food);
    renderButtons();
    });
    $(document).on("click", ".food-btn", displayFood);
    renderButtons(); 
});


