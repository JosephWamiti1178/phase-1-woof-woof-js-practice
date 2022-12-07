document.addEventListener("DOMContentLoaded", ()=>{
    let isGoodDog
    createSpan()
    toggleGoodBad(false)
    
})

const createSpan = async ()=>{
    const div = document.querySelector('#dog-bar')
    // const span = document.createElement("span")
    const dogs = await getDogs()
    const dogInfo = document.querySelector("#dog-info")
    const img = document.createElement("img")
    const btn = document.createElement("button")
    dogInfo.append(img)
    dogInfo.append(btn)

    dogs.map((dog) => {
        const span = document.createElement("span")
        span.textContent = dog.name
        span.addEventListener('click', ()=>{
            img.setAttribute("src", dog.image)
            btn.textContent = dog.isGoodDog? "Good Dog!": "Bad Dog!"
            
        })
        div.appendChild(span)
        
    
    })
    //console.log(dogs)
    // getDogs().then(data => data.map((dog) => {
    //     const span = document.createElement("span")
    //     span.textContent = dog.name
    //     div.appendChild(span)

    // }))
}
const getDogs = ()=>{
    return fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(data => data)
}
// const displayDog = (dog)=>{
//     const dogInfo = document.querySelector('dog-info')
// }
const toggleGoodBad = ()=>{
    const btn = document.querySelector("#good-dog-filter")
    btn.addEventListener('click', ()=> {
        fetch(`http://localhost:3000/pups?isGoodDog=${isGoodDog}`)
    .then(response => response.json())
    .then(data => data)
    })
}