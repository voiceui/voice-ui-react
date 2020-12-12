import React from "react";
import Controller from "voiceui-react";
import { useEffect, useState } from "react";
import { Container, TextField, Box } from "@material-ui/core";
type State =   {[key: string]: any}
function VoiceForm() {
  function state(state : State) {
    return state
  }

  const [values, setValues] = useState(state({username: '', password: ''}));
  const homeRef = React.useRef<HTMLElement>(null)
  const aboutRef = React.useRef<HTMLElement>(null)
  const servicesRef = React.useRef<HTMLElement>(null)
  const voiceController = new Controller({formControls :["username", "password", "login"], restart:true, sectionRefs:[homeRef,aboutRef,servicesRef]})

  const isVoiceRecognitionSupported = voiceController.voiceControlsSupported()
  let result: Object = {};
  useEffect(()=>{
    console.log("isVoiceRecognitionSupported",isVoiceRecognitionSupported)

    if(voiceController.startRecognition()){
      result = voiceController.getVoiceController()
      console.log("result",result)
      setValues({username : true})

    }
  },[isVoiceRecognitionSupported])
  // useEffect(() => {
  //   if (result){
  //     const key = Object.keys(result)[0];
  //     const value =result[key];
  //     setValues({
  //      key: value
  //     });
  //   }
  // }, [result]);

  return (
    <div className="App">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            name="username"
            value={values.username}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            value={values.password}
            variant="outlined"
          />
        </Container>
      </Box>
    </div>
  );
}

export default VoiceForm;
