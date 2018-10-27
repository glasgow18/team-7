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
        }
    });

    window.setInterval(function(){
        console.log("let me sleeppppp");
    }, 1000);
});

