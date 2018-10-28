const functions = require('firebase-functions');
const admin = require('firebase-admin');
const config = functions.config();

const express = require('express');

const uuidv4 = require('uuid/v4');

const app = express();

admin.initializeApp(config.firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

app.post('/filterusers', (req,res) => {
    var name = String(req.body.name);
    var tag = req.body.tag;
    var location = String(req.body.location);
    var max_age = req.body.max_age;
    var min_age = req.body.min_age;

    var db = admin.database();
    var useref = db.ref().child('UserInfo')
    var result = {}
    useref.once('value').then(function(snapshot) {
        snapshot.forEach(function (childSnapshot) {

            var tabname = String(childSnapshot.val().name);
            var tablocation = String(childSnapshot.val().location);

            if(tag == childSnapshot.val().tag || tag.length == 0)
            {
                if((childSnapshot.val().age > min_age || min_age == -1) && (childSnapshot.val().age < max_age || max_age == -1))
                    if (tabname.length >= name.length || name.length == 0) {
                        var length = name.length;
                        if (name == tabname.slice(0, length) || name.length == 0) {

                            if (tablocation.length >= location.length || location.length == 0) {
                                length = location.length;
                                if (location == tablocation.slice(0, length) || location.length == 0) {

                                    var user = {}
                                    user["name"] = childSnapshot.val().name;
                                    user["location"] = childSnapshot.val().location;
                                    user["age"] = childSnapshot.val().age;
                                    user["tag"] = childSnapshot.val().tag;
                                    result[uuidv4()] = user;
                                }
                            }
                        }
                    }
            }

        })
    }).then(function(){
        res.status(200).json(result);
    })
});

app.post('/setstar', (req,res) => {
    var name = String(req.body.name);
    var stars = req.body.stars;

    var db = admin.database();
    var starsref = db.ref().child('Stars').child(name)

    for (var i = 0; i < stars.length; i++) {
        starsref.child(stars[i].id).update(stars[i]);
    }
    res.status(200).json({"result":"Successful"});
})

app.post('/getstar', (req,res) => {
    var name = String(req.body.name);
    var db = admin.database();
    var starsref = db.ref().child('Stars').child(name)

    var result = []

    starsref.once('value').then(function(snapshot) {
        if(snapshot != undefined)
        {
            snapshot.forEach(function (childSnapshot) {
                var user = {}
                user["id"] = childSnapshot.val().id;
                user["name"] = childSnapshot.val().name;
                user["number"] = childSnapshot.val().number;
                result.push(user);
            })
        }
    }).then(function(){
        res.status(200).json(result);
    })
})

app.post('/texttogroup', (req,res) => {
    var sender = String(req.body.sender);
    var sendto = String(req.body.sendto);
    var message = String(req.body.message);

    var db = admin.database();
    var textref = db.ref().child('Texts').child(sendto)

    var textcount = 0;

    textref.child("textcount").once('value').then(function (snapshot) {
        if(snapshot.val() != undefined)
        {
            textcount = parseInt(snapshot.val());
        }
    }).then(function (){
        textcount += 1;
        textref.child("textcount").set(textcount);
        var newtext = {};
        newtext["sender"] = sender;
        newtext["message"] = message;
        newtext["id"] = textcount;
        textref.child(textcount).set(newtext);
    }).then(function ()
    {
        res.status(200).json({"result":"Successful"});
    });
});

app.post('/gettextfromgroup', (req,res) => {
    var roomid = req.body.roomid;

    var db = admin.database();
    var textref = db.ref().child('Texts').child(roomid)

    var result = []

    var roomname = ""


    textref.once('value').then(function(snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var text = {}
            text["sender"] = childSnapshot.val().sender
            text["message"] = childSnapshot.val().message
            text["id"] = childSnapshot.val().id;

            result.push(text);
        })
    }).then(function(){
        db = admin.database();
        textref = db.ref().child('IDCollection').child(roomid)
        textref.once("value").then(function (roomn) {
            roomname = roomn.val();
        }).then(function(){
            res.status(200).json({"roomname": roomname,"texts": result});
        })
    });
})


exports.api = functions.https.onRequest(app);