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
        // create button
        const updateButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        // insert value to element
        word.innerText = `${i}. ${data.word}`;
        wordDescription.innerText = data.description;
        updateButton.innerHTML = "Update";
        deleteButton.innerHTML = "Delete";

        // add event listener
        updateButton.addEventListener('click', function(e){
            toUpdatePage();
        });

        deleteButton.addEventListener('click', function(e){
            deleteData();
        });
        
        // function
        function toUpdatePage(){
            location.href = `/update/${data.word_id}`;
        }

        function deleteData(){
            // DELETE request using fetch()
            fetch(`${uri}/api/words/${data.word_id}`, {
                method: 'DELETE',
                mode: 'cors',
            })
            .catch(err => console.log(err));

            // alert and refresh page
            alert("Deleting word succeded! Click 'OK' to continue.");
            location.reload();
        }

        // append p element to div
        wordsDiv.append(word);
        wordsDiv.append(wordDescription);
        wordsDiv.append(updateButton);
        wordsDiv.append(deleteButton);
        i++;
    });
})
.catch(err => {
    console.log("ERROR:", err.message);
});