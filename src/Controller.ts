import { GetSpeechRecognition } from './processors/SpeechRecognition'
import {VoiceControl} from "./VoiceControl";
import {Options} from "./types";
import {
  extractTheValueToBeSetFromTranscript,
  getControlTypeFromTranscript,
  getMatchedUtteranceFromTranscript
} from "./processors";

export class Controller {
  constructor(options : Options) {
    this.speechController = GetSpeechRecognition()
    this.options = options;
  }

  public speechController: any
  private readonly options : Options

  voiceControlsSupported(): Boolean {
    return Boolean(this.speechController)
  }

  getVoiceController(): Object {
    return  VoiceControl(this.options,this.speechController,
      getControlTypeFromTranscript,
      getMatchedUtteranceFromTranscript,
      extractTheValueToBeSetFromTranscript)
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
