"use strict";

const API_TOKEN = `your_api_token`;
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_TOKEN}`;

const backgroundImage = document.getElementById('background_img');
const backgroundTitle = document.getElementById('img_title');
const buttonInfo = document.getElementById('button_info');
const imgDescription = document.getElementById('img_description');

const setBackground = (date = "") => {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            backgroundImage.src = data.url;
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

setBackground();

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
    backgroundImage.classList.toggle('blur');
})