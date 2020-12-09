import { controlTypes } from '../constants'

// get the matched word from input array based on transcript
export const getMatchedUtteranceFromTranscript = (transcript, inputArray) => {
  const words =
    transcript &&
    transcript.split(' ').filter((word) => {
      return inputArray.includes(word)
    })
  return words && words[0].trim()
}

// get the value that needs to be set for input fields
export const extractTheValueToBeSetFromTranscript = (
  transcript,
  matchedWord
) => {
  const value = transcript.split(matchedWord)
  return value && value[1] && value[1].trim()
}

// get the type of control
export const getControlTypeFromTranscript = (transcript) => {
  for (const controlType in controlTypes) {
    // for correct control it should start with words in controlTypes constant
    if (transcript.startsWith(controlTypes[controlType])) {
      return controlTypes[controlType]
    }
  }
  return null
}
