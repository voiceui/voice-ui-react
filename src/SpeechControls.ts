import { GetSpeechRecognition } from './processors/SpeechRecognition'
export class SpeechControls {
  constructor() {
    this.speechController = GetSpeechRecognition()
  }

  public speechController: any

  voiceControlsSupported(): Boolean {
    return Boolean(this.speechController)
  }

  getVoiceController(): any {
    return this.speechController
  }

  startRecognition(): boolean {
    try {
      this.speechController.start()
      return true
    } catch (e) {
      return false
    }
  }

  stopRecognition(): boolean {
    try {
      this.speechController.stop()
      return true
    } catch (e) {
      return false
    }
  }
}
