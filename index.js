
function getQuestions() {

    let userInput = document.getElementsByClassName('search')[0].value;
    let url = `https://api.stackexchange.com/2.2/search/advanced?q=${userInput}&order=desc&sort=votes&accepted=True&site=stackoverflow&filter=!bKBaj5pLxXiQ8l`;
    document.getElementById('output').innerHTML = ""
    console.log(url);
    
    /*
    tags: (5) ["java", "c++", "performance", "optimization", "branch-prediction"]
    owner: {reputation: 427492, user_id: 87234, user_type: "registered", 
        accept_rate: 100, profile_image: "https://i.stack.imgur.com/FkjBe.png?s=128&g=1", 
        display_name: "GManNickG"
        link: "https://stackoverflow.com/users/87234/gmannickg"
    }
    is_answered: true
    view_count: 1457067
    protected_date: 1399067470
    accepted_answer_id: 11227902
    answer_count: 26
    score: 24035
    last_activity_date: 1580224225
    creation_date: 1340805096
    last_edit_date: 1569980131
    question_id: 11227809
    link: "https://stackoverflow.com/questions/11227809/why-is-processing-a-sorted-array-faster-than-processing-an-unsorted-array"
    title: "Why is processing a sorted array faster than processing an unsorted array?"
    */
    
    
    let xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            // Parsing the JSON string the API responded with, turning it into an object
            let response = JSON.parse(this.responseText); //return value
            
            console.log(response.items);
            
           
            for(let i=0; i<response.items.length; i++) {
                let question = response.items[i];
                
                let output = "";
                output += "<hr>";
                output += `<a href='${question.link}'>${question.title}</a><br>`;
                document.getElementById("output").innerHTML += output;
            }
        }
    };
    
    // Sending the HTTP request
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
}






