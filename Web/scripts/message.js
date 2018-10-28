$(document).ready(function(){
    var ids = ['#group-1', '#group-2', '#person-1', '#person-2', '#person-3'];
    var rooms = ['1234A', '1234A', '1234A', '1234A', '1234A'];

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
});