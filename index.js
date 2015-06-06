var express = require('express');
var app = express();
var pg = require('pg');
var request = require('request');
var bodyParser = require('body-parser');
var multer = require('multer');

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use('/node_modules', express.static('node_modules'));
app.use('/js', express.static('js'));
app.use('/css', express.static('css'));

function log(msg) {
    console.log(msg);
}

var APP_ID = 7740523506827330;
var APP_SECRET = "l6l8QHRBUVJyn+1NqjZq7p4uERt+gTc17a7KA6fIV/tNwfTjxkrGTfc3np909WnDCwoQ4Y4p90Q69vWRcOv2fg==";

app.get('/', function(req, res){
    request('http://api.globalhack4.test.lockerdome.com/app_create_content?{"app_id":7740523506827330,"app_secret":"l6l8QHRBUVJyn+1NqjZq7p4uERt+gTc17a7KA6fIV/tNwfTjxkrGTfc3np909WnDCwoQ4Y4p90Q69vWRcOv2fg==","app_data":{"fun":"times"},"name":"Some App Content","text":"Short description of your content"}', function (error, response, body) {
        if (!error && res.statusCode == 200) {
            console.log(body); // Show the HTML for the Google homepage.
        }
    });
    res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), function() {
    console.log("Node app is running on port:" + app.get('port'))
})

app.get('/db', function (req, res) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM test_table', function(err, result) {
            done();
            if (err)
            { console.error(err); res.send("Error " + err); }
            else
            { res.send(result.rows); }
        });
    });
});

app.get('/hook', function (req, res) {
    console.log(req.body);
    res.json(req.body);
});
