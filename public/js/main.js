// custom scripts

$(function() {

    console.log("hello!"); // sanity check

    $('.gist-input-form').hide();
    // $('.answers').hide();

    // click handler for adding answer button
    $('.submit-answer-btn').on('click', function() {
        console.log("submit answer button clicked!"); // sanity check
        $('.gist-input-form').show();
        $('.submit-answer-btn').hide();
    });

    // click handler for cancel button
    $('.cancel-btn').on('click', function(event) {
        event.preventDefault();
        console.log("cancel button clicked!"); // sanity check
        $('.submit-answer-btn').show();
        $('.gist-input-form').hide();
        $('.input-box').val("");
    });

    // click handler for submit button
    $('.submit-btn').on('click', function(event) {
        event.preventDefault();
        console.log("submit button clicked!"); // sanity check
        $('.submit-answer-btn').show();
        $('.gist-input-form').hide();
        // grab value from input box
        var value = $('.input-box').val();
        var mongoID = $('.problem-desc').attr('data-problem-id');
        $('.input-box').val("");
        // ajax request
        request = $.ajax({
          type: "POST",
          url: "/github",
          data: JSON.stringify({input:value, id:mongoID}),
          contentType: "application/json; charset=utf-8",
          dataType: "json"
        });

        request.done(function (data) {
          console.log('success!');
          console.log(data.response);
          var gistURL = '<td><a href="'+data.response+'">'+data.response+'</a></td>';
          $('.ajax-solution').append(gistURL);
        });

        request.fail(function (error) {
          console.log('fail!');
          console.log(error);  // need to handle this better
        });
    });

});