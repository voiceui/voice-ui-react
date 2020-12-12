import { controlTypes } from '../constants'

// get the matched word from input array based on transcript
export const getMatchedUtteranceFromTranscript = (
  transcript: string,
  formControlArray: Array<string>
): string => {
  const words =
    transcript &&
    transcript.split(' ').filter((word) => {
      return formControlArray.includes(word)
    })
  return words && words[0].trim()
}

// get the value that needs to be set for input fields
export const extractTheValueToBeSetFromTranscript = (
  transcript: string,
  matchedWord: string
): string => {
  const value = transcript.split(matchedWord)
  return value && value[1] && value[1].trim()
}

// get the type of control
export const getControlTypeFromTranscript = (
  transcript: string
): string | null => {
  for (const controlType in controlTypes) {
    // for correct control it should start with words in controlTypes constant
    if (transcript.startsWith(controlTypes[controlType])) {
      return controlTypes[controlType]
    }
  }
  return null
}
