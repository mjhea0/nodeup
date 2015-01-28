// custom scripts



$(function() {

    console.log("hello!"); // sanity check

    // click handler for submit answer button
    $('.submit-answer-btn').on('click', function() {
        console.log("yes!");
        $.post("/github", function( data ) {
            console.log(data);
        });
    });

});