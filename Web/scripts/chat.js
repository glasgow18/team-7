var selfChatString = '<li class="self"><div class="avatar"><img src="https://i.imgur.com/HYcn9xO.png" draggable="false"/></div><div class="msg"><p>191919</p><time>a few secs ago</time></div></li>'
var otherChatString = '<li class="other"><div class="avatar"><img src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div><div class="msg"><p>191919</p><time>a few secs ago</time></div></li>'

function chatInsert(message, mySelf) {
    if(mySelf === true)
        return selfChatString.replace('191919',message).replace(':o','<emoji class="scream"/>');
    else
        return otherChatString.replace('191919',message).replace(':o','<emoji class="scream"/>');
}

function sendMessage(sender, sendto, message) {
    var postUrl = 'https://us-central1-code4good-kidswithcancer.cloudfunctions.net/api/texttogroup/';
    var trackingJSON = '{ "sender": "'+ sender +'", "sendto": "'+ sendto +'", "message": "'+ message+'"}';
    console.log(trackingJSON);

    $.ajax({
        type: "POST",
        url: postUrl,
        contentType: "application/json",
        data: trackingJSON,
        beforeSend: function() { return; },
        complete: function() { return; },
        success: function(data) {
            console.log("message sent");
        },

        error: function(data) { console.log("error: 39381") },
        dataType: 'json'
    });
}

function fetch(){
    console.log("let me sleeppppp");
    //todo fetch messages from server
    localStorage.setItem("currentRoom","1234A");
    var trackingJSON = '{"roomid": "'+ localStorage.getItem("currentRoom").toString() +'"}';
    var postUrl =  "https://us-central1-code4good-kidswithcancer.cloudfunctions.net/api/gettextfromgroup/";

    $.ajax({
        type: "POST",
        url: postUrl,
        contentType: "application/json",
        data: trackingJSON,
        beforeSend: function() { return; },
        complete: function() { return; },
        success: function(data) {
            //todo set the room title with data.roomname
            console.log(data);

            if(data.roomname !== null)
                $('#chat-title').text(data.roomname);
            // return;
            if(data.texts === null)
                return;

            $('.chat').empty();
            data.texts = data.texts.filter((a)=>!$.isEmptyObject(a));
            data.texts = data.texts.sort((a)=> parseInt(a.id));

            for(var i = 0 ; i < data.texts.length ; i++)
            {
                var text = data.texts[i];
                // if($.isEmptyObject( text ))
                //     continue;
                var self = text.sender == localStorage.getItem("user");
                var newElement = $.parseHTML(chatInsert(text.message, self));
                $('.chat').append(newElement);
            }
        },

        error: function(data) { console.log("error: 39381") },
        dataType: 'json'
    });
}

$(document).ready(function(){
    $(document).keypress(function(e) {
        if(e.which == 13) {
            text = $("#message-input").val();
            $("#message-input").val('');

            if(text === '')
                return;

            console.log(text);

            newText = $.parseHTML(chatInsert(text, true));

            $(".chat").append(newText);
            $(document).scrollTop($(document).height());
            sendMessage(localStorage.getItem('user') ,localStorage.getItem('currentRoom'),text);
        }
    });

    $('.back').click(function(){
        window.history.back();
    });

    fetch();
    window.setInterval(fetch, 10000);
});



// EXAMPLE GET
// $(document).ready(function() {
//     $.ajax({
//         url: "http://rest-service.guides.spring.io/greeting"
//     }).then(function(data) {
//         $('.greeting-id').append(data.id);
//         $('.greeting-content').append(data.content);
//     });
// });

// EXAMPLE POST
// var trackingJSON = JSON.stringify(tracking_data);
// var urlAjax =  "http://localhost:7001/ds/resources/track/" + trackid;
//
// $.ajax({
//     type: "POST",
//     url: urlAjax,
//     contentType: "application/json",
//     data: trackingJSON,
//     beforeSend: function() { $.mobile.showPageLoadingMsg("b", "Loading...", true) },
//     complete: function() { $.mobile.hidePageLoadingMsg() },
//     success: function(data) { alert("ajax worked"); },
//     error: function(data) {alert("ajax error"); },
//     dataType: 'json'
// });