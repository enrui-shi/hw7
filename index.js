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
    query = 'SELECT player, a, gs FROM assists WHERE club=\"'+club+'\"and pos=\"'+pos+'\"'
    console.log('query:',query)
    connection.query(query, 
                    function(err, result, fields) {
                        if(err){
                            console.log(err)
                        }
                        var max=-1
                        var gs=-1
                        var player
                        var total=0
                        var count=0
                        for (i in result){
                            count= count+1
                            total = result[i].a+total
                            if(result[i].a>max||(result[i].a=max&&result[i].gs>gs)){
                                max = result[i].a
                                gs = result[i].gs
                                player = result[i].player
                            }
                        }
                        res.json({
                            'club':club,
                            'pos':pos,
                            'max_assists': max, 
                            'player':player, 
                            'avg_assists': total/count
                        })
                    });
    
})
app.listen(port,'0.0.0.0', () => {
    return console.log(`App listening on port ${port}!`);
})