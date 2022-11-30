// IIFE
$(function() {
    // IPO - Input -> Process -> Output

    // Constants and Variables
    const API_URL = 'https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=boolean';

    let questionObjectsArray;

    // Cache DOM element references
    const $cardsSection = $('#cards-section');
    const $modal = $('.modal');
    const $answerResult = $('#answer-result');
    // Register Event Listener
    $cardsSection.on('click', 'button', handleClick);
    // Functions

    getData();

    function getData() {
        $.ajax(API_URL)
        .then(function(data) {
            questionObjectsArray = data.results;
            render(data.results);
        }, function(error) {
            console.log(error);
        });
    }

    function handleClick() {
        const $target = $(this);
        const answer = $target.text();
        const $questionAnsweredCard = $target.closest('article');
        const questionIndex = $questionAnsweredCard.attr('data-index');
        const questionReference = questionObjectsArray[questionIndex];
        
        if (questionReference.correct_answer === answer) {
            $answerResult.text('You Guessed Correctly');
        } else {
            $answerResult.text('You Guessed Incorrectly');
        }

        $modal.modal({
            fadeDuration: 500
        });

        $questionAnsweredCard.fadeOut(500, function() {
            $(this).remove();
        });
        /*
            Add feature to answer quiz question
            1) store a reference to the target element that triggers a button click
            event
            2) store a value representing the given answer
            3) store a value representing an identifying piece of information
            for the quiz question being answered
            4) lookup the quiz object and compare the given answer to the correct 
            answer property
            5) alert the user if they guess correctly or incorrectly
            6) remove the answered question from the DOM
        
        */
    }

    function render(quizQuestions) {
        const quizCards = quizQuestions.map(function(questionObject, index) {
            return `
            <article data-index="${index}">
                <h2>${questionObject.question}</h2>
                <button>True</button>
                <button>False</button>
            </article>`;
        }).join('');

        $cardsSection.html(quizCards);
    }


    // Psuedocode

    /*
    1) Select a dom element I can use to insert some quiz cards into

    2) make an ajax request to the api and get some quiz data

    3) loop over the list of quiz question objects and generate an html card for each object

    4) use the selected dom element to append my quiz cards to the dom

    */
});