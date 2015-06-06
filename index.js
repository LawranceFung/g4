var express = require('express');
var app = express();
var cool = require('cool-ascii-faces');
var pg = require('pg');
var path = require("path");

app.set('port', (process.env.PORT || 5000));

app.use('/public', express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use('/js', express.static('js'));
app.use('/css', express.static('css'));


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), function() {
    console.log("Node app is running on port:" + app.get('port'))
})

app.get('/db', function (request, response) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM test_table', function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });
})
