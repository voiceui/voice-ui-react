import { useEffect, useState } from 'react'
import { getInteractionType, getMatchedWord, getValue } from './utils'
import { interactionTypes } from './constants'

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.mozSpeechRecognition ||
  window.msSpeechRecognition ||
  window.oSpeechRecognition

  let recognition;

if (SpeechRecognition) {
  recognition = new SpeechRecognition()
  recognition.continuous = true
  recognition.lang = 'en-US'
  recognition.interimResults = false
  recognition.maxAlternatives = 1
  recognition.start()
}
export const useVoice = (options) => {
  const [result, setResult] = useState(null);
  const [transcript, setTranscript] = useState('');
  const inputs = options.inputs;
  const refs = options.refs;
  const sectionRefs = options.sections;
  let matchedRef;
  let sectionRef;
  //to handle transcript changes
  useEffect(() => {
    const matchedWord = getMatchedWord(transcript, inputs)
    const interactionType = getInteractionType(transcript)
    if (
      (matchedWord && interactionType) ||
      interactionType === interactionTypes.NAVIGATE
    ) {
      switch (interactionType) {
        case interactionTypes.TEXT_INPUT:
          setResult({ [matchedWord]: getValue(transcript, matchedWord) })
          break;
        case interactionTypes.CLICK:
          if(matchedWord){
            matchedRef = refs[matchedWord];
            matchedRef && matchedRef.current && matchedRef.current.click()
          }
          break;
        case interactionTypes.NAVIGATE:
          sectionRef = sectionRefs.find(
            (sectionRef) =>
              sectionRef.current.id ===
              getValue(transcript, interactionTypes.NAVIGATE)
          )
          if (sectionRef !== undefined) smoothScroll(sectionRef.current, 1000)
          break;
        default:
          break;
      }
    }
  }, [transcript])

  //voice recognition functions
  if (recognition) {
    recognition.onresult = function (event) {
      //this will trigger the process
      setTranscript(event.results[event.resultIndex][0].transcript.trim())
    }

    recognition.onend = function (event) {
      //this will trigger if the options is set to restart
      if(options.restart){
        recognition.start()
      }
      
    }
  } else {
    console.log(
      '********** Your browser does not support SpeechRecognition *******'
    )
  }

  const smoothScroll = (target, duration) => {
    var targetPosition = target.getBoundingClientRect().top + window.pageYOffset
    var startPosition = window.pageYOffset
    var distance = targetPosition - startPosition
    var startTime = null

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime
      var timeElapsed = currentTime - startTime
      var run = ease(timeElapsed, startPosition, distance, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }
    function ease(t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }
    requestAnimationFrame(animation)
  }

  return result;
}
