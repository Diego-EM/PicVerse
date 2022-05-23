"use strict";
const API_TOKEN = `your_api_token`;
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
const loadScreen = document.getElementById('main_screen');

let selectedDate = "";

const setBackground = (date) => {
    loadScreen.classList.remove('hidden');
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

const hideLoadScreen = () =>{
    const loading = document.getElementById('loading');
    const errorMsg = document.getElementById('error_message');
    loadScreen.classList.add('hidden');
    loading.classList.remove('hidden');
    errorMsg.classList.add('hidden');
    loadScreen.style.zIndex = 1000000
}

setBackground();
initializeState(buttonQuality, 'invisible', "quality", "HD");
initializeState(buttonView, 'invisible', "view", "contain");

if (localStorage.getItem('view') == "contain")
    backgroundImage.classList.add('contain')

backgroundImage.onload = function() {
    loadScreen.classList.add('hidden');
    this.classList.add('presentation');
    backgroundTitle.classList.add('show_title');
    buttonInfo.classList.remove('invisible');
    this.addEventListener('animationend',()=>{
        this.classList.remove('presentation');
        backgroundTitle.classList.remove('show_title');
    })
}

backgroundImage.onerror = function() {
    const loading = document.getElementById('loading');
    const errorMsg = document.getElementById('error_message');
    errorMsg.classList.remove('hidden');
    loading.classList.add('hidden');
    loadScreen.style.zIndex = 100;
    if (this.src === `${location.href}undefined`){
        errorMsg.textContent = "There's no pic for today :(. Try another date.";
    } else {
        errorMsg.innerHTML = `Oooops, videos are not supported yet :(.
            But you can see the video <a href=${this.src} target="_blank">here</a>.`;
    }
}

buttonInfo.addEventListener('click',()=>{    
    imgDescription.classList.toggle('hidden');
    if (searchModal.classList.contains('hidden'))
        backgroundImage.classList.toggle('blur');
    searchModal.classList.add('hidden');
    hideLoadScreen();
})

buttonSearch.addEventListener('click',()=>{
    searchModal.classList.toggle('hidden');
    if (imgDescription.classList.contains('hidden'))
        backgroundImage.classList.toggle('blur');
    imgDescription.classList.add('hidden');
    hideLoadScreen();
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