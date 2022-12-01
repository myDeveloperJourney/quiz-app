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
            render();
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
    }

    function render() {
        const quizCards = questionObjectsArray.map(function(questionObject, index) {
            return `
            <article data-index="${index}">
                <h2>${questionObject.question}</h2>
                <button>True</button>
                <button>False</button>
            </article>`;
        }).join('');
        $cardsSection.html(quizCards);
    }
});