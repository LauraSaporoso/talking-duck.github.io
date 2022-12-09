let voices = [];
speechSynthesis.addEventListener('voiceschanged', function () {
  voices = speechSynthesis.getVoices();
  console.log(voices);
})

const textArea = document.querySelector('textarea');
const playButton = document.querySelector('button');
const pitchBar = document.querySelector('input');
const duckFigure = document.querySelector('figure');


playButton.addEventListener('click', function () {   
    const textLength = textArea.value.trim().length;   
    if (textLength > 0) {
        talk();
    } 
});

/* -----------------
    FUNZIONI
----------------- */

function talk(){

    const text = textArea.value;
    const pitch = pitchBar.value;
    const utterance = new SpeechSynthesisUtterance(text); 
    utterance.pitch = pitch; 
    const femaleVoice = voices.find(function (voice) {
        if (voice.name.includes('Elsa' || 'Alice')) {
          return true;
        }
      });
    
      utterance.voice = femaleVoice;
    speechSynthesis.speak(utterance);
    utterance.addEventListener('start', function() {
        textArea.disabled = true;
        pitchBar.disabled = true;
        playButton.disabled = true;
        duckFigure.classList.add('talking');
    }) 
    utterance.addEventListener('end', function() {
        duckFigure.classList.remove('talking');
        textArea.disabled = false;
        pitchBar.disabled = false;
        playButton.disabled = false;
    })
}