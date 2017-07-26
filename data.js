/**
 * Created by Chloe on 26/07/2017.
 */
var answersCancer = [new Answer("Dog","cancer"),new Answer("Age", "cancer")];
var answersFake = [new Answer("Cat","fake"), new Answer("Crossing the road","fake")];
var score = 0;
module.exports = {
     getAnswers: function(){
        var cancer = answersCancer[Math.floor(Math.random() * answersCancer.length)];
        var fake = answersFake[Math.floor(Math.random() * answersFake.length)];
        var randomNum = Math.floor(Math.random() * 2)
        if (randomNum === 1){return [fake, cancer];}
        return[cancer,fake];
    },
    increaseScore: function () {
        score++;
    },
    getScore: function () {
        return score;
    }
};

function Answer(text,type){
    this.text = text;
    this.type = type;
}