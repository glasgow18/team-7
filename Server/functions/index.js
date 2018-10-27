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


            if (tabname.length >= name.length) {
                var length = name.length;
                if (name == tabname.slice(0, length)) {

                    if (tablocation.length >= location.length) {
                        length = location.length;
                        if (location == tablocation.slice(0, length)) {

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

exports.api = functions.https.onRequest(app);