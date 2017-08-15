/**
 * Created by Chloe on 27/07/2017.
 */
const mongoose = require("mongoose");
const fs = require('fs');
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



function saveAnswersCancer(file, encoding){
    return new Promise(function (resolve, reject) {
        fs.readFile(file,encoding, function (err,data) {
            if (err) return console.error(err);
            resolve(data)
        })
    })
}
 function saveAnswersFake() {
     let fakeAnswers = ["CATS","JAVASCRIPT","CLASSMATES","ORANGES","MCDONALDS",
         "DOCTORS","BEING BRITISH","FOREIGNERS","JEANS","EARTH SPIRIT",
         "MEETINGS","FRANCE","STRAWBERRIES","YOUR NAN","TREES",
         "GRASS","DMITRY","LIFTING","CHAIRS","LEAGUE OF LEGENDS",
         "READING THE DAILY MAIL","PAINT","DONALD TRUMP","HAVING SMALL HANDS","SOCIAL BENEFITS",
         "THE NHS","MECHANICAL KEYBOARDS","PUTIN","THE BBC","STAMPS",
         "SNAKES"
     ];
     for(item of fakeAnswers){
         let answer = new Answer({text: item, type:"fake"});
         answer.save(function (err) {
             if(err) return console.error(err);
         })
     }
}
saveAnswersFake();

saveAnswersCancer('data.json','utf8').then(data => {
    return JSON.parse(data);
}).then(data =>{
    for(item of data){
       let answer = new Answer({text: item.text, type:"cancer", url: item.url})
        answer.save(function (err) {
            if(err) return console.error(err);
        })
    }
});
Answer.remove({},function () {
});

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