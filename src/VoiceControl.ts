import { useEffect, useState } from 'react'
import { controlTypes } from './constants'
import {
  ExtractTheValueToBeSetFromTranscript,
  GetControlTypeFromTranscript,
  GetMatchedUtteranceFromTranscript,
  Options} from './types'

export const VoiceControl = (
  options: Options,
  speechRecognition: SpeechRecognition,
  getControlTypeFromTranscript: GetControlTypeFromTranscript,
  getMatchedUtteranceFromTranscript: GetMatchedUtteranceFromTranscript,
  extractTheValueToBeSetFromTranscript: ExtractTheValueToBeSetFromTranscript
): Object => {
  const [result, setResult] = useState<Object | null>()
  const [transcript, setTranscript] = useState('')
  const formFields = options.formControls || []
  const refs = options.formRefs || []
  const sectionRefs = options.sectionRefs || []
  let matchedRef
  let sectionRef
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
          setResult(  {
            matchedUtterance: extractTheValueToBeSetFromTranscript(
              transcript,
              matchedUtterance
            )
          })
          break
        case controlTypes.CLICK:
          if (matchedUtterance) {
            matchedRef = refs && refs[matchedUtterance]
            matchedRef && matchedRef.current && matchedRef.current.click()
          }
          break
        case controlTypes.NAVIGATE:
          sectionRef = sectionRefs!.find(
            (sectionRef) =>
              sectionRef && sectionRef.current!.id ===
              extractTheValueToBeSetFromTranscript(
                transcript,
                controlTypes.NAVIGATE
              )
          )
          if (sectionRef !== undefined) smoothScroll(sectionRef!.current!, 1000)
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

    speechRecognition.onend = function () {
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

  const smoothScroll = (target : HTMLElement, duration: number) => {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    function animation(currentTime: number | null) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime! - startTime!;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }
    function ease(t: number, b: number, c: number, d: number) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }
    requestAnimationFrame(animation)
  }

  return result || {}
}
