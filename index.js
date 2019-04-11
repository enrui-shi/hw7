const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'hw7'
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.get('/hw7',function(req,res){
    club = req.query.club
    pos = req.query.pos
    query = 'SELECT player a gs From assists WHERE club='+club+' pos='+pos
    connection.query(query, 
                    function(err, result) {
                        console.log(result);
                    });
    res.json({
        'club':club,
        'pos':pos,

    })
})
app.listen(port,'0.0.0.0', () => {
    return console.log(`App listening on port ${port}!`);
})