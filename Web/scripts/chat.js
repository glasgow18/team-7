$(document).ready(function(){
    $(document).keypress(function(e) {
        if(e.which == 13) {
            text = $("#message-input").val();

            if(text === '')
                return;

            console.log(text);

            newText = $.parseHTML('<li class="self"><div class="avatar"><img src="https://i.imgur.com/HYcn9xO.png" draggable="false"/></div><div class="msg"><p>191919</p><time>20:18</time></div></li>'.replace('191919',text).replace(':o','<emoji class="scream"/>'));

            $(".chat").append(newText);
            $(document).scrollTop($(document).height());

            //todo send text to server by room id
            $(document).ready(function() {
            $.ajax({
                url: "guy's url"
            }).then(function(data) {
                //successful then what todo
                $('.greeting-id').append(data.id);
                $('.greeting-content').append(data.content);
            });
        });
        }
    });

    window.setInterval(function(){
        console.log("let me sleeppppp");
        //todo fetch messages from server
        var trackingJSON = '{mockup data}';
        var postUrl =  "guy's url";

        $.ajax({
            type: "POST",
            url: postUrl,
            contentType: "application/json",
            data: trackingJSON,
            beforeSend: function() { $.mobile.showPageLoadingMsg("b", "Loading...", true) },
            complete: function() { $.mobile.hidePageLoadingMsg() },
            success: function(data) { /*todo update chat page*/ },
            error: function(data) { console.log("error: 39381") },
            dataType: 'json'
        });
    }, 500);
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