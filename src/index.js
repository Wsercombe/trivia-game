import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import TriviaGame from './js/trivia-game.js';


function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


function prepareAnswers(apiKey) {
  const answerArray = [];
  if (apiKey.type === "multiple") { 
    answerArray.push(apiKey["correct_answer"]);
    apiKey["incorrect_answers"].forEach(function(answer){ 
      answerArray.push(answer);
    })
  } else {
    answerArray.push(apiKey["correct_answer"])
    answerArray.push(apiKey["incorrect_answers"][0]);
  }
  return shuffle(answerArray);
}




$(document).ready(function() {
  $('#start-game').click(function() {
    event.preventDefault();
    let output = ""
    let answers = []
    let answerString = ""
    let promise = TriviaGame.createGame();
    promise.then(function(response) { 
      const apiResponse = JSON.parse(response);
      Object.keys(apiResponse).forEach(function(key) {
        Object.keys(apiResponse[key]).forEach(function(i) {
          answerString =""
          output = apiResponse[key][i]["question"]
          console.log(output);
          console.log(prepareAnswers(apiResponse[key][i]));  
          console.log(apiResponse[key][i]["correct_answer"]);
          answers = prepareAnswers(apiResponse[key][i]); 
          $("#output-area").append(`<p><strong>${output}</strong> </p>`);
          answers.forEach(function(item) {
            answerString += `<p><marquee scrollamount="50"><button>${item}</button></marquee><p>`;
          })
          //answers = answers.join("&emsp;&emsp;")
          $("#output-area").append(answerString);
         // $('#output-area').append(`<p> ${apiResponse[key][i]["question"]} </p>`);
        })
      })
    }, function(error) {
      console.log(error);
    });
  });
});





// $(document).ready(function() {
//   $('#answer').click(function() {
//     let city = $('#location').val();
//     // clearFields();

// });