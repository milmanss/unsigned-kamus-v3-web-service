// URI
const uri = "https://unsigned-kamus-v3-api.herokuapp.com";

// click triggering
document.querySelector('#submit').addEventListener('click',function(e){
    submitData();
});

// function to post a word
function submitData(){
    // getting word and desc value
    var word = document.querySelector('#word').value;
    var desc = document.querySelector('#desc').value;

    // create json format data
    let data = {
        'word': word,
        'description': desc
    };

    // POST request using fetch()
    fetch(`${uri}/api/words`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .catch(err => console.log(err));

    // alert and blank the value
    alert("Adding word succeded! Click 'OK' to continue.");
    location.href = `/dashboard`;
}

