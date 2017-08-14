/**
 * Created by Chloe on 27/07/2017.
 */
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/dm");
const db = mongoose.connection;
db.on('error', console.error.bind('console','connection error: '));
db.once('open',function () {
    console.log('Connected!')
});
let answerSchema = mongoose.Schema({
    text: String,
    type: String,
    url: String
});
const Answer = mongoose.model('Answer', answerSchema);

    let answerInput = [new Answer({text: "Dog",type:"cancer",url: "http://www.dailymail.co.uk/health/article-490581/Can-dogs-breast-cancer-Bizarre-medical-theories-experts-claim-actually-true.html"}),
    new Answer({text: "Cat",type:"fake"}),

    ];

function saveAnswers() {
    for(let i = 0; i < answerInput.length; i++){
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
    getAnswers: async function(){
        let answers = new Array(2);
        const answer1 = await Answer.find({type: "cancer"}, function (err, results) {
            if(err) return console.error(err);
            let max = results.length;
            let randomnum = Math.floor(Math.random() * max);
            answers[0] = results[randomnum];

        });
        const answer2 = await Answer.find({type: "fake"},function (err, results) {
            if(err) return console.error(err);
            let max = results.length;
            let randomnum = Math.floor(Math.random() * max);
            answers[1] = results[randomnum];
        });
        return answers;
    }
};