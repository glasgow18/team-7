

function search() {
    $('.search-result-list').show();
    // var postUrl = 'https://us-central1-code4good-kidswithcancer.cloudfunctions.net/api/filterusers/';
    //
    // sendingJson = {
    //     "name":$('#search-string').val(),
    //     "tag":$('#tag').val(),
    //     "location":$('#location').val(),
    //     "min_age":-1,
    //     "max_age":-1
    // };
    //
    // var trackingJSON = JSON.stringify(sendingJson);
    // console.log(trackingJSON);
    //
    // $.ajax({
    //     type: "POST",
    //     url: postUrl,
    //     contentType: "application/json",
    //     data: trackingJSON,
    //     beforeSend: function() { return; },
    //     complete: function() { return; },
    //     success: function(data) {
    //         console.log("searched");
    //         console.log(data);
    //     },
    //
    //     error: function(data) { console.log("error: 56553") },
    //     dataType: 'json'
    // });
}

$(document).ready(function(){
    $('.search-result-list').hide();
    $('#search-button').click(function() {

        search();

    });
});