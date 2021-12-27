const textarea = document.querySelector("textarea");
voiceList = document.querySelector("select");
speechBtn = document.querySelector("button");

let synth = speechSynthesis;
isSpeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        //Default : English "United States" 
        let selected = voice.name === "English (United States)"?"selected": "";         /*     a?b:c      */
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        //if the available device voice name is equal to the user selected voice
        //then set the speech voice to the user selected voice
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    speechSynthesis.speak(utterance);//speak the speech utterance
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        //If isSpeaking is true then change it's value to false and resume the speech/utterance
        //else change it's value to true and pause the speech
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }
        if(textarea.value.length >1){
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }

            //checking is utterance/speech in speaking process or not in every 100ms
            //if not then set the value of isSpeaking to true and change the button text 
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true; 
                    speechBtn.innerText = "Convert to Speech";
                }
            });
        }else{
            speechBtn.innerText = "Convert to Speech";
        }
    }
});