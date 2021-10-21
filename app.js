const express = require('express');
const request = require('request');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Providing the path of our static files

app.get('/', function(req, res) {

    res.sendFile(__dirname + '/signup.html');
})

app.post('/', function(req, res) {
    firstName = req.body.fName;
    lastName = req.body.lName;
    email = req.body.email;

    console.log(firstName, lastName, email);
})

app.listen(3000, function() {
    console.log('The newsletter server is running on port 3000.');
});