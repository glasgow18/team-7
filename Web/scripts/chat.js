var selfChatString = '<li class="self"><div class="avatar"><img src="https://i.imgur.com/HYcn9xO.png" draggable="false"/></div><div class="msg"><p>191919</p><time>20:18</time></div></li>'
function chatInsert(message) {
    return selfChatString.replace('191919',message).replace(':o','<emoji class="scream"/>');
}

$(document).ready(function(){
    $(document).keypress(function(e) {
        if(e.which == 13) {
            text = $("#message-input").val();
            $("#message-input").val('');

            if(text === '')
                return;

            console.log(text);

            newText = $.parseHTML(chatInsert(text));

            $(".chat").append(newText);
            $(document).scrollTop($(document).height());

            var postUrl = 'https://us-central1-code4good-kidswithcancer.cloudfunctions.net/api/texttogroup/';
            var trackingJSON = '{ "sender": "'+'Doflamingo'+'”, “sendto": "'+localStorage.getItem("currentRoom")+'”, “message": "'+text+'"}';

            // var trackingJSON = '{ "sender": "Doflamingo”, “sendto": "BoyScount”, “message": "Did you know that GEICO can save you 15% or more on your car insurance?"}';
            // var trackingJSON = '{"roomid": "'+ localStorage.getItem("currentRoom").toString() +'"}';
            // var postUrl =  "https://us-central1-code4good-kidswithcancer.cloudfunctions.net/api/gettextfromgroup/";

            $.ajax({
                type: "POST",
                url: postUrl,
                contentType: "application/json",
                data: trackingJSON,
                beforeSend: function() { return; },
                complete: function() { return; },
                success: function(data) {
                },

                error: function(data) { console.log("error: 39381") },
                dataType: 'json'
            });
        }
    });

    $('.back').click(function(){
        window.history.back();
    });

    window.setInterval(function(){
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
                // return;
                if(data.texts === null)
                    return;

                $('.chat').empty();
                for(var i = 0 ; i < data.texts.length ; i++)
                {
                    var text = data.texts[i];
                    if($.isEmptyObject( text ))
                        continue;
                    var newElement = $.parseHTML(chatInsert(text.message));
                    $('.chat').append(newElement);
                }
            },

            error: function(data) { console.log("error: 39381") },
            dataType: 'json'
        });
    }, 5000);
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