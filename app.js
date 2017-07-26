/**
 * Created by Chloe on 26/07/2017.
 */
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const data = require('./data.js');
const port = 3001;
const bodyParser = require('body-parser')


app.engine('handlebars',exphbs({defaultLayour: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/css',express.static(__dirname + '/css'));

app.get('/',function (req,res, score) {
    var answers = data.getAnswers();
    var score = data.getScore();
    res.render('home', {
        scoreData: score,
        answers: answers
    });
});

app.post('/answer',function (req,res) {
    console.log(req.body);
    if(req.body.type === "cancer") {
        data.increaseScore();
        res.send('true');
    }
    else{
        res.send("false");
    }

});
app.listen(port,function () {
    console.log('Listening on port ', port);
});