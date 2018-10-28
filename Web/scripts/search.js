

function search() {
    $('.search-result-list').fadeIn(200);
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

    var ids = ['#group-1', '#group-2', '#person-1', '#person-2', '#person-3', '#person-4'];
    var rooms = ['1234A', '1234A', '1234A', '1234A', '1234A', '1234A'];

    $(ids[0]).click(function(){
        localStorage.setItem("currentRoom", rooms[0]);
        window.location.href = "chat.html";
    });

    $(ids[1]).click(function(){
        localStorage.setItem("currentRoom", rooms[1]);
        window.location.href = "chat.html";
    });

    $(ids[2]).click(function(){
        localStorage.setItem("currentRoom", rooms[2]);
        window.location.href = "chat.html";
    });

    $(ids[3]).click(function(){
        localStorage.setItem("currentRoom", rooms[3]);
        window.location.href = "chat.html";
    });

    $(ids[4]).click(function(){
        localStorage.setItem("currentRoom", rooms[4]);
        window.location.href = "chat.html";
    });

    $(ids[5]).click(function(){
        localStorage.setItem("currentRoom", rooms[5]);
        window.location.href = "chat.html";
    });
});