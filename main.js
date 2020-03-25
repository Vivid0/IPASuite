let charObj;
const modalcont = document.querySelector(`.modalcont`);
requestChar();

//Returns a random index given an array
function getRandomIndex (arr) {
    return Math.round(Math.random() * (arr.length - 1));
};

//puts emphasis on the sound within the reference word
function emphasize (wordStr, emphStr) {
    return wordStr.replace(emphStr,`<span class="emphasis">${emphStr}</span>`);
}

//shows the answer to the flash card and removes "Show Answer" button
function showAnswer () {
    const hidden = document.querySelector(`.hidden`);
    hidden.classList.remove(`hidden`);
    const showans = document.querySelector(`.showans`);
    showans.classList.add(`hidden`);
}

//Request an IPA character from the letters or next button
function requestChar () {
    const request = new XMLHttpRequest();
    request.open(`GET`,`data.json`);
    request.responseType = `json`;
    request.send();
    request.onload = () => {
        charObj = request.response.ipaChar
        charObj = charObj[getRandomIndex(charObj)];
    }
}

//Generate and populate the letters modal
function lettersModal () {
    //initialize the modal container
    modalcont.innerHTML = ``;

    //declare pieces of display text
    const char = charObj.ipaChar;
    const lang = charObj.refLanguage;
    const word = charObj.refWord;
    const jaw = charObj.jaw;
    const tongue = charObj.tongue;
    const emph = charObj.refEmphasis;
    
    //create HTML string for letters modal app
    lettersHTMLString = 
    `
    <div class="modalbg">
        <div class="modal" role="dialog">
            <button class="close" type="button" role="button" name="close">x</button>
            <button class="next" type="button" role="button" name="next">▶︎</button>
            <div class="question">${char}</div>
            <button class="showans" type="button" name="showans">Show Answer</button>
            <div class="answer hidden">
                <span class="key">${lang}:</span><span class="value">${emphasize(word,emph)}</span>
                <span class="key">jaw:</span><span class="value">${jaw}</span>
                <span class="key">tongue:</span><span class="value">${tongue}</span>
            </div>
        </div>
    </div>
    `
    //change the HTML string into a contextual fragment
    const lettersFrag = document.createRange().createContextualFragment(lettersHTMLString);

    //append the fragment to the modal container
    modalcont.appendChild(lettersFrag);
    
    //Next button
    const next = document.querySelector(`[name="next"]`);
    next.addEventListener(`click`, () => {
        requestChar();
        lettersModal();
    });

    //Show Answer button
    const showans = document.querySelector(`[name="showans"]`);
    showans.addEventListener(`click`, () => {
        showAnswer();
    });

    //Close buton
    const close = document.querySelector(`[name="close"]`);
    close.addEventListener(`click`, () => {modalcont.innerHTML = ``});
}

//Letters button
const letters = document.querySelector(`[name="letters"]`);
letters.addEventListener(`click`, () => {
    requestChar();
    lettersModal();
});


    //create a modal
    //create elements or HTML fragment
    //send request to data.json to retrieve a random index
    //create a "Show Answer" button on the modal
    //create a "Next" button on the modal

//Show Answer button
    //reveal the answer: refLanguage: refWord modified by refEmphasis, tongue, jaw
//Next button
    //send request to data.json to retrieve a random index
//Close button
    //deletes the modal elements