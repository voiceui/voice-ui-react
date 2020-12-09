/* global requestAnimationFrame */

import { useEffect, useState } from 'react'
import {
  getControlTypeFromTranscript,
  getMatchedUtteranceFromTranscript,
  extractTheValueToBeSetFromTranscript
} from './processors'
import { controlTypes } from './constants'
import { SpeechRecognitionManager } from './processors/SpeechRecognition'

export const useVoiceControl = (...options) => {
  const [result, setResult] = useState(null)
  const [transcript, setTranscript] = useState('')
  const formFields = options.formFields
  const refs = options.refs
  const sectionRefs = refs && refs.sections
  let matchedRef
  let sectionRef
  const speechRecognition = SpeechRecognitionManager()
  // to handle transcript changes
  useEffect(() => {
    const matchedUtterance = getMatchedUtteranceFromTranscript(
      transcript,
      formFields
    )
    const controlType = getControlTypeFromTranscript(transcript)
    if (
      (matchedUtterance && controlType) ||
      controlType === controlTypes.NAVIGATE
    ) {
      switch (controlType) {
        case controlTypes.TEXT_INPUT:
          setResult({
            [matchedUtterance]: extractTheValueToBeSetFromTranscript(
              transcript,
              matchedUtterance
            ),
            append: options.appendMode
          })
          break
        case controlTypes.CLICK:
          if (matchedUtterance) {
            matchedRef = refs[matchedUtterance]
            matchedRef && matchedRef.current && matchedRef.current.click()
          }
          break
        case controlTypes.NAVIGATE:
          sectionRef = sectionRefs.find(
            (sectionRef) =>
              sectionRef.current.id ===
              extractTheValueToBeSetFromTranscript(
                transcript,
                controlTypes.NAVIGATE
              )
          )
          if (sectionRef !== undefined) smoothScroll(sectionRef.current, 1000)
          break
        default:
          break
      }
    }
  }, [transcript])

  // voice recognition functions
  if (speechRecognition) {
    speechRecognition.onresult = function (event) {
      // this will trigger the process
      setTranscript(event.results[event.resultIndex][0].transcript.trim())
    }

    speechRecognition.onend = function (event) {
      // this will trigger if the options is set to restart
      if (options.restart) {
        speechRecognition.start()
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

  return result
}
