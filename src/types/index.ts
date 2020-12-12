import React from 'react'

export type Options = {
  formControls?: Array<String>
  sectionRefs?: Array<React.RefObject<HTMLElement>>
  formRefs?: Array<React.RefObject<HTMLElement>>
  botName?: String
  restart?: Boolean
}


export type GetMatchedUtteranceFromTranscript = (
  transcript: String,
  formControlArray: Array<String>
) => string

export type ExtractTheValueToBeSetFromTranscript = (
  transcript: String,
  matchedWord: String
) => string

export type GetControlTypeFromTranscript = (transcript: String) => string | null
