// Your code here
const URL = "http://localhost:3000/characters"

//Fetching  Character Names 
// fetch(URL)
// .then((response)=>{
//     console.log(response)//converting from json
//     return response.json()
//       .then((data)=> {//pass 
//         return data
//         renderNames()
//     })
// })
// function fetchNames(){
//     return fetch(URL)
//     .then(response => response.json())
// }

//I'm using fecth() with JSON to get some details from an API. 
//I then want to display these details in my html so they render on the page.

//The API I am using returns details about Animals, 
//for example, panda, monkey, lion, panda, mr.cute so that we can vote for the cutest animal

function fetchNames(){
     return fetch(URL) //fetching the data from json server
    .then(response => response.json())//convert from JSON format

}
    

// {
//     return response.json()
//     .then(function(data){
//         console.log(data)
//     })
// });
function renderNames(character){ 
    //characterBar == 'character-bar'
    const characterBar = document.getElementById('character-bar'); //getting character-bar element 
    const span = document.createElement('span') //create a span element
    span.innerHTML = character.name;//saving character name to our span
    characterBar.appendChild(span); //appending element span to our character-bar
    span.dataset.id = character.id;//providing read/write access to custom data attributes on span element
    span.addEventListener('click',  characterClick)//Adding an event listener and calling charaterclick function
}

fetchNames().then(character => { 
    character.forEach(character => {
        renderNames(character)      
      });
})
// //Fetching character details

function fetchDetails(id){
    return fetch(URL + `/${id}`)//Fetching the details by their ID
    .then(response => response.json())//COnverting from JSON format
}
function characterClick(event){//getting the elemnts after someon clicks
    fetchDetails(event.target.dataset.id)//accessing data attributes from the event object
    .then(renderDetails)
}
function renderDetails(character){
    const characterInfo = document.getElementById("detailed-info");//getting our div with its ID detailed-info
    const name = document.getElementById("name")// getting our paragraph by its id of name
    name.innerText = character.name //getting and returning the inner text of our node and assigning it to the name of our character

    const img = document.getElementById('image') // getting our image element by its id of image
    img.src = character.image //  setting images to our img node 
    

    const votes = document.getElementById('vote-count');//getting our span element by its id of vote-count
    votes.innerText = character.votes//getting and returning the inner text of our node and assigning it to the votes of our character
}

//Getting our form element
//listening to submit event
document.getElementById("votes-form").addEventListener("submit", (event) =>{
    event.preventDefault()// preventing reloading of the page
    const form = event.target;//implementing event delegation.
    const votes = document.getElementById("vote-count")//Save a reference to the element with id 'vote-count
    votes.innerText = parseInt(form.votes.value) + parseInt(votes.innerText)
    //getting and returning  the vote count from user and adding it to the initial input converting each to an interger first
    form.reset()//reseting the form after clicking reseting reset button
})

//getting our button by its ID and listening to a click event so that when the 
// reset button is clicked it returns the innertxt and assigns to 0
document.getElementById('reset-btn').addEventListener("click", () =>{
    document.getElementById("vote-count").innerText = 0;
})
//fires when the initial HTML document has been completely loaded and parsed
//without waiting for stylesheets, images and subframes to finish loadfing
document.addEventListener("DOMContentLoaded", function(){
    fetchNames()
    fetchDetails()
})