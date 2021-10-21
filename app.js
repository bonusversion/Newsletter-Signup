const express = require('express');
const request = require('request');
const https = require('https');
const mailchimp = require("@mailchimp/mailchimp_marketing");


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Providing the path of our static files

app.get('/', function(req, res) {

    res.sendFile(__dirname + '/signup.html');
})


app.post('/', function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    mailchimp.setConfig({
        apiKey: "97babf2826e37c03601db90340070e5c-us5",
        server: "us5",
    });

    const listId = "90a46aa076";
    const subscribingUser = {
        firstName: req.body.fName,
        lastName: req.body.lName,
        email: req.body.email,
    };

    async function run() {
        try {
            const response = await mailchimp.lists.addListMember(listId, {
                email_address: subscribingUser.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: subscribingUser.firstName,
                    LNAME: subscribingUser.lastName,
                },
            });
            console.log(response);
            res.sendFile(__dirname + "/success.html");
        } catch (error) {
            res.sendFile(__dirname + "/failure.html");
        }
    }

    run();

});


app.post('/failure', function(req, res) {
    res.redirect('/');
})

app.listen(3000, function() {
    console.log('The newsletter server is running on port 3000.');
});







// API key
// 97babf2826e37c03601db90340070e5c-us5

// List ID
// 90a46aa076