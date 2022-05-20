"use strict";

const API_TOKEN = `your_api_token`;
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_TOKEN}`;

const backgroundImage = document.getElementById('background_img');
const backgroundTitle = document.getElementById('img_description');

const setBackground = (date = "") => {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            backgroundImage.src = data.url;
            backgroundTitle.textContent = data.title;
        })
        .catch(e => {
            console.log('Oooops, an error has ocurred: ', e);
        })
}

setBackground();

backgroundImage.onload = function(){
    this.classList.add('presentation');
    backgroundTitle.classList.add('show_title');
    this.addEventListener('animationend',()=>{
        this.classList.remove('presentation');
        backgroundTitle.classList.remove('show_title');
    })
}
