// URI
const uri = "https://unsigned-kamus-v3-api.herokuapp.com";

// click triggering
document.querySelector('#update').addEventListener('click',function(e){
    updateData();
});

//  GET request using fetch() 
fetch(`${uri}/api/words/${window.location.pathname.split('/')[2]}`, {
    method: 'GET',
    mode: 'cors',
})
.then(res => {
    // check response
    if(res.ok){
        return res.json();
    }else{
        throw new Error("BAD HTTP!");
    }
})
.then(json => {
    // create div
    const wordsDiv = document.querySelector(`#words`);
    var i = 1;
    json.response.forEach(data => {
        // create p
        const word = document.createElement("p");
        const wordDescription = document.createElement("p");

        // insert value to p element
        word.innerText = `Word: ${data.word}`;
        wordDescription.innerText = `Description: ${data.description}`;

        // append p element to div
        wordsDiv.append(word);
        wordsDiv.append(wordDescription);
        i++;
    });
})
.catch(err => {
    console.log("ERROR:", err.message);
});

// function to post a word
function updateData(){
    // getting word and desc value
    var word = document.querySelector('#word').value;
    var desc = document.querySelector('#desc').value;

    // create json format data
    let data = {
        'word': word,
        'description': desc
    };

    // POST request using fetch()
    fetch(`${uri}/api/words/${window.location.pathname.split('/')[2]}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .catch(err => console.log(err));

    // alert and blank the value
    alert("Updating word succeded! Click 'OK' to continue.");
    location.href = `/edit`;
}

