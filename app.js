"use strict";
const API_TOKEN = `P7suvpHZDX31jIYLAXWDrJnbFV9PgTpduapPzn10`;
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_TOKEN}`;

const backgroundImage = document.getElementById('background_img');
const backgroundTitle = document.getElementById('img_title');
const imgDescription = document.getElementById('img_description');
const searchModal = document.getElementById('search_modal');
const buttonInfo = document.getElementById('button_info');
const buttonQuality = document.getElementById('img_quality');
const buttonView = document.getElementById('img_view');
const buttonSearch = document.getElementById('img_search');
const searchDate = document.getElementById('search_date');

let selectedDate = "";

const setBackground = (date) => {
    let URL = API_URL
    if (date) URL += `&date=${date}`;
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            backgroundImage.src = (localStorage.getItem('quality') == "HD") ? data.hdurl : data.url;
            backgroundTitle.textContent = data.title;
            document.getElementById('title').textContent = data.title;
            document.getElementById('author').textContent = data.copyright;
            document.getElementById('date').textContent = data.date;
            document.getElementById('description').textContent = data.explanation;
        })
        .catch(e => {
            console.log('Oooops, an error has ocurred: ', e);
        })
}

const initializeState = (elem, cl = "class", localProperty = "", localValue ="") => {
    const buttonIcons = elem.getElementsByTagName('IMG');
    if (localStorage.getItem(localProperty) == localValue)
        buttonIcons[0].classList.add(cl);
    else
        buttonIcons[1].classList.add(cl);
}

const switchState = (elements = [], cl = "class") =>{
    for (let el of elements){
        if(el.classList.contains(cl)) el.classList.remove(cl)
        else el.classList.add(cl);
    }
}

setBackground();
initializeState(buttonQuality, 'invisible', "quality", "HD");
initializeState(buttonView, 'invisible', "view", "contain");

if (localStorage.getItem('view') == "contain")
    backgroundImage.classList.add('contain')
backgroundImage.onload = function(){
    this.classList.add('presentation');
    backgroundTitle.classList.add('show_title');
    buttonInfo.classList.remove('invisible');
    this.addEventListener('animationend',()=>{
        this.classList.remove('presentation');
        backgroundTitle.classList.remove('show_title');
    })
}

buttonInfo.addEventListener('click',()=>{    
    imgDescription.classList.toggle('hidden');
    if (searchModal.classList.contains('hidden'))
        backgroundImage.classList.toggle('blur');
    searchModal.classList.add('hidden');
})

buttonSearch.addEventListener('click',()=>{
    searchModal.classList.toggle('hidden');
    if (imgDescription.classList.contains('hidden'))
        backgroundImage.classList.toggle('blur');
    imgDescription.classList.add('hidden');
})

buttonQuality.addEventListener('click',()=>{
    let quality = (localStorage.getItem('quality') == "HD") ? "SD" : "HD";
    localStorage.setItem('quality',quality);
    setBackground(selectedDate);
    const buttonIcons = buttonQuality.getElementsByTagName('IMG');
    switchState(buttonIcons, 'invisible');
})

buttonView.addEventListener('click',()=>{
    let view = (localStorage.getItem('view') == "contain") ? "cover" : "contain";
    localStorage.setItem('view',view);
    backgroundImage.classList.toggle('contain');
    const buttonIcons = buttonView.getElementsByTagName('IMG');
    switchState(buttonIcons, 'invisible');
})

searchDate.addEventListener('click',e => {
    e.preventDefault();
    selectedDate = document.getElementById('date_input').value;
    setBackground(selectedDate);
    backgroundImage.classList.toggle('blur');
    searchModal.classList.toggle('hidden');
    imgDescription.classList.add('hidden');
})