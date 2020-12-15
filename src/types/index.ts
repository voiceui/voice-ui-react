import React from 'react'

export type Options = {
  formControls?: Array<string>
  sectionRefs?: Array<React.RefObject<HTMLElement>>
  formRefs?: Array<React.RefObject<HTMLElement>>
  botName?: string
  restart?: Boolean
}

export type GetMatchedUtteranceFromTranscript = (
  transcript: string,
  formControlArray: Array<string>
) => string

export type ExtractTheValueToBeSetFromTranscript = (
  transcript: string,
  matchedWord: string
) => string

export type GetControlTypeFromTranscript = (transcript: string) => string | null
