/**
 * Created by Chloe on 26/07/2017.
 */
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const port = 3001;
const bodyParser = require('body-parser');
const db = require('./mongoose');
app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/css',express.static(__dirname + '/css'));


app.get('/',function (req,res, score) {
    var answers = db.getAnswers();
    res.render('home', {
        answers: answers
    });
});

app.post('/answer',function (req,res) {
    id = req.body.id;
    db.Answer.findById(id,'type',function (err, result) {
        if(err)console.error(err);
        if(result.type === "cancer"){
            res.send('true');
        }else{
            res.send('false');
        }
    });
});
app.listen(port,function () {
    console.log('Listening on port ', port);
});