/**
 * Created by Chloe on 27/07/2017.
 */
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/dm");
var db = mongoose.connection;
db.on('error', console.error.bind('console','connection error: '));
db.once('open',function () {
    console.log('Connected!')
});
var answerSchema = mongoose.Schema({
    text: String,
    type: String,
    url: String
});
var Answer = mongoose.model('Answer', answerSchema);

    var answerInput = [new Answer({text: "Dog",type:"cancer",url: "http://www.dailymail.co.uk/health/article-490581/Can-dogs-breast-cancer-Bizarre-medical-theories-experts-claim-actually-true.html"}),
    new Answer({text: "Cat",type:"fake"}),

    ];

function saveAnswers() {
    for(var i = 0; i < answerInput.length; i++){
        answerInput[i].save(function (err, answer) {
            if (err) return console.error(err)
        });
    }
}
Answer.remove({},function () {
});
saveAnswers();
exports.Answer = Answer;
module.exports = {
    Answer : Answer,
    getAnswers: function() {
        var answers = new Array(2);
        Answer.find({type: "cancer"}, function (err, results) {
            if(err) return console.error(err);
            var max = results.length;
            var randomnum = Math.floor(Math.random() * max);
            answers[0] = results[randomnum];
            console.log(answers[0])
        });
        Answer.find({type: "fake"},function (err, results) {
            if(err) return console.error(err);
            var max = results.length;
            var randomnum = Math.floor(Math.random() * max);
            answers[1] = results[randomnum];
        });
        return answers;
    }
};