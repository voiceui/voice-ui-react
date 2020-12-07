import React, { createContext, useEffect, useState } from "react";

export const VoiceContext = createContext();

export const VoiceProvider = ({ children }) => {
  const [result, setResult] = useState(null);
  const [inputs, setInputs] = useState([]);
  const [ref, setRef] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [scrollableSections, setScrollableSections] = useState([]);


  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onresult = function (event) {
    setTranscript(event.results[event.resultIndex][0].transcript);
  };
  const smoothScroll= (target,duration)=> {
    var targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime){
      if(startTime === null) startTime = currentTime;
      var timeElapsed = currentTime - startTime;
      var run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0,run);
      if(timeElapsed < duration) requestAnimationFrame(animation);
    }
    function ease(t, b, c, d){
      t /= d/2;
      if(t<1) return c / 2 * t * t +b;
      t--;
      return -c / 2 * (t * (t-2) - 1) +b;

    }
    requestAnimationFrame(animation);
  }
  useEffect(() => {
    recognition.start();
  }, [inputs]);

  useEffect(() => {
    const matchedWord =
      transcript &&
      transcript.split(" ").filter((word) => {
        return inputs.includes(word);
      });
    if (transcript.includes("set") && matchedWord) {
      setResult({ [matchedWord[0]]: transcript.split(matchedWord)[1] });
    }
    if (transcript.includes("submit") && matchedWord) {
      ref.current.click()
    }
    // Pattern "* | go to | <section name> | *"
    if(transcript.includes("go") && transcript.includes("to")){ 
      const words = transcript.split(" ");
      let section =null;
      //Extract Section name
      words.forEach((word,index)=>{
          if(index>1){
            if(words[index-2]==="go" && words[index-1]==="to"){
              section = word;
              return;
            }
          }
      });
      if(section!==null){
        //find ref whose id is equal to section name
        let sectionRef = scrollableSections.find(sectionRef => sectionRef.current.id === section);
        if(sectionRef!==undefined)
        smoothScroll(sectionRef.current,1000);
      }
    }
  }, [transcript]);
  return (
    <VoiceContext.Provider
      value={{
        result,
        setInputs,
        setRef,
        setScrollableSections
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};
