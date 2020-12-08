import {interactionTypes} from '../constants'


//get the matched word from input array based on transcript
export const getMatchedWord = (transcript, inputArray) => {
   const words = transcript &&
        transcript.split(' ').filter((word) => {
          return inputArray.includes(word)
        })
    return words && words[0]
}

//get the value that needs to be set for input fields
export const getValue = (transcript, matchedWord) =>{
    const value = transcript.split(matchedWord);
    return value && value[1] && value[1].trim()
}

//get the type of interaction
export const getInteractionType = (transcript) =>{
    for(let interactionType in interactionTypes){
        //for correct interaction it should start with words in interactionTypes constant
        if(transcript.startsWith(interactionTypes[interactionType])){
            return interactionTypes[interactionType];
        }
    }
    return null;
}