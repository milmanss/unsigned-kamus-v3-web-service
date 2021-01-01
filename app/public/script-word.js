// URI
const uri = "https://unsigned-kamus-v3-api.herokuapp.com";

//  GET request using fetch() 
fetch(`${uri}/api/words`, {
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
        word.innerText = `${i}. ${data.word}`;
        wordDescription.innerText = data.description;

        // append p element to div
        wordsDiv.append(word);
        wordsDiv.append(wordDescription);
        i++;
    });
})
.catch(err => {
    console.log("ERROR:", err.message);
});

