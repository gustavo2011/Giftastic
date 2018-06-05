console.log("startup test");
//Array of Animals 
var animals = ["Penguin","Tiger","Pibutll","Turtle","Monkey","Donkey","Pig","Dolphin","Starfish","Pig"];
var animal;

function createButton () {

    $("#animalButtons").empty();


    //loops through array of animals

    for (var i = 0 ; i < animals.length; i++) {

        var a = $("<button>");

        a.addClass("animals");

        a.attr("data-animal", animals[i]);

        a.text(animals[i]);

        $("#animalButtons").append(a);

    }
}

$("#add-animal").on("click", function(event) {
    animal = $("#animal-input").val().trim();

    console.log("button created for " + animal);

    animals.push(animal);

    createButton();

    $(document).on("click", ".gif", function(){

        var state = $(this).attr("data-state");

        console.log(state);

        if (state === "still") {

            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }
    })
})

$('body').on('click', '.animals', function()
{
  $(".gifHolder").empty();

  var animal = $(this).attr("data-animal");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=wl4ismyBQ0tCfstBtKe10pynEn7nn5lj";

  $.ajax({
  url: queryURL,
  method: "GET"
  })
  .then(function(response)
  {
    console.log(queryURL);
    console.log(response);

    var results = response.data;

    for (var i = 0; i < results.length; i++)
    {
      var animalDiv = $("<div class = 'animalDiv'>")
      var p = $("<p>").text("Rating: " + results[i].rating);
      var animalImage = $("<img>");
      animalImage.addClass("gif");
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalImage.attr("data-state", "still")
      animalImage.attr("data-still", response.data[i].images.fixed_height_still.url);
      animalImage.attr("data-animate", response.data[i].images.fixed_height.url);
      animalDiv.append(p);
      animalDiv.append(animalImage);

      $(".gifHolder").prepend(animalDiv);

    }
  });

});