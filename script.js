// IIFE
$(function() {
    // IPO - Input -> Process -> Output

    // Constants and Variables
    const API_URL = 'https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=boolean';

    // Cache DOM element references
    const $cardsSection = $('#cards-section');
    // Register Event Listener
    $cardsSection.on('click', 'button', handleClick);
    // Functions

    getData();

    function getData() {
        $.ajax(API_URL)
        .then(function(data) {
            render(data.results);
        }, function(error) {
            console.log(error);
        });
    }

    function handleClick() {
        console.log('click');
    }

    function render(quizQuestions) {
        const quizCards = quizQuestions.map(function(questionObject) {
            return `
            <article>
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