import React, { createContext, useEffect, useState } from "react";

export const VoiceContext = createContext();

export const VoiceProvider = ({ children }) => {
  const [result, setResult] = useState(null);
  const [inputs, setInputs] = useState([]);
  const [ref, setRef] = useState(null);
  const [transcript, setTranscript] = useState("");

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
  }, [transcript]);
  return (
    <VoiceContext.Provider
      value={{
        result,
        setInputs,
        setRef
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};
