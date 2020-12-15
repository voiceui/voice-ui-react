/* eslint dot-notation: ["warn"] */
export const GetSpeechRecognition = () => {
  const SpeechRecognition =
    (window.SpeechRecognition ||
      window['webkitSpeechRecognition'] ||
      window['mozSpeechRecognition'] ||
      window['msSpeechRecognition'] ||
      window['oSpeechRecognition'])
  let speechRecognition

  if (SpeechRecognition) {
    speechRecognition = new SpeechRecognition()
    speechRecognition.continuous = true
    speechRecognition.lang = 'en-US'
    speechRecognition.interimResults = false
    speechRecognition.maxAlternatives = 1
    return speechRecognition
  }

  return speechRecognition
}
