
// Simplification of long strings of numbers i.e 1234567 to 1.23M
function roundNumber(number) {

    if (number >= 1000000) {
        return (number / 1000000).toFixed(2) + "M";
    }
    else if (number >= 1000) {
        return (number / 1000).toFixed(2) + "K";
    }
    else {
        return "" + number;
    }
}

function showAnswer(id) {
    // Search input
    let userInput = document.getElementsByClassName('search')[0].value;
    let url = `https://api.stackexchange.com/2.2/answers/${id}?order=desc&sort=activity&site=stackoverflow&filter=!9Z(-wzu0T`

    console.log(url);

    // Making the object that can send HTTP requests
    let xmlhttp = new XMLHttpRequest();
    // Preparing to handle the response from the API
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            // Parsing the JSON string the API responded with, turning it into an object
            let response = JSON.parse(this.responseText); // Return value

            console.log(response.items);

            let item = response.items[0];
            console.log(item);

            // Answer modal
            document.getElementById("fade").innerHTML = item.body;
            // Rounding upvotes
            let roundScore = roundNumber(item.score);
            document.getElementById("fade").innerHTML += `<b>${roundScore}</b> upvotes</br>`;
            $("#fade").modal({
                fadeDuration: 200,
                fadeDelay: 0.20
            });
        }
    };

    // Sending the HTTP request
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getQuestions() {

    const sortOption = document.getElementById('sort').value
    let userInput = document.getElementsByClassName('search')[0].value;

    let url = `https://api.stackexchange.com/2.2/search/advanced?q=${userInput}&order=desc&sort=${sortOption}&accepted=True&site=stackoverflow&filter=withbody`;


    document.getElementById('output').innerHTML = ""
    console.log(url);


    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            // Parsing the JSON string the API responded with, turning it into an object
            let response = JSON.parse(this.responseText); // Return value

            console.log(response.items);


            for (let i = 0; i < response.items.length; i++) {
                // Getting a question from the array
                let question = response.items[i];

                let output = "";

                // Question
                output += `<div class="card-container">`
                // Rounding upvotes and views
                let roundScore = roundNumber(question.score);
                let roundViewCount = roundNumber(question.view_count);
                output += `<b>${roundScore}</b> upvotes | <b>${roundViewCount}</b> views<br></br>`;

                output += `<a href='${question.link}'>${question.title}</a><br>`;
                // Answer
                // Button passes in acccepted answer id
                // On button click, modal with answer appears
                output += `<br><button class = "answer-button" onclick="showAnswer(${question.accepted_answer_id});">Get the top answer 🎉</a><br></button>`;
                output += `<br><br>Question context:`
                output += `<hr class="link-hr">`;
                output += `${question.body}<br>`;

                output += "</div>"
                // Putting elements in the output div
                document.getElementById("output").innerHTML += output;
            }
        }
    };

    // Sending the HTTP request
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}


