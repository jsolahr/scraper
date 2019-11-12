/* eslint-disable no-undef */
// Whenever someone clicks a p tag
$(document).on("click", "p", function () {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        // With that done, add the note information to the page
        .then(function (data) {
            console.log(data);
            // The title of the article
            $("#notes").append("<h2>" + data.title + "</h2>");
            $("#notes").append("<h4>Product #:" + data._id + "</h4>");

            // An input to enter a new title
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }
        });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            // Value taken from title input
            // Value taken from note textarea
            body: $("#bodyinput").val(),
        }
    })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data.title);
            console.log(data.link);
            console.log(thisId);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in t`he input and textarea for note entry
    $("#bodyinput").val("");
});

//Clear Saved Blankets On'Click
$(document).on("click", "#clear-blankets", function () {
    $.ajax({
        method: "DELETE",
        url: "/articles/",

    })
        .then(function (data) {
            console.log(data);
            $("#articles").empty();
        })

    $.ajax({
        method: "DELETE",
        url: "/notes/",
    })
        .then(function (data) {
            // Log the response
            console.log(data);
            $("#notes").empty();
        })
});

//Scrape Blankets On'Click Button
$(document).on("click", "#scrape-blankets, #home", function () {

    $.ajax({
        method: "GET",
        url: "/scrape/"
    })
        .then(function (data) {
            $("#notes").empty();

            $.getJSON("/articles", function (data) {

                for (var i = 0; i < data.length; i++) {

                    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
                }
            })
            console.log(data);
        });
});


//Save Blankets On'Click Button
$(document).on("click", "#save-blankets", function () {

    $.ajax({
        method: "GET",
        url: "/notes/" 
    })
        .then(function (data) {
            $("#articles").empty();

            $.getJSON("/notes", function (data) {

                for (var i = 0; i < data.length; i++) {

                    var productID = $("<h6> Product ID: " + data[i]._id + "</h6>") 
                    var noteBody = $("<h6> Saved: " + data[i].body + "</h6>") 

                    $("#notes").append(productID);
                    $("#notes").append(noteBody);
                    $("#notes").append("<br>");
                }
            });
            console.log(data);
        });

    $("#notes").empty();
});


 