import React from "react";
import { useEffect, useState } from "react";
import { Container, TextField, Box } from "@material-ui/core";
import {SpeechControls, useVoiceControl} from "voiceui-react";
type State =   {[key: string]: any}
function VoiceForm() {
  function state(state : State) {
    return state
  }

  const [values, setValues] = useState(state({username: '', password: ''}));
  const homeRef = React.useRef<HTMLElement>(null)
  const aboutRef = React.useRef<HTMLElement>(null)
  const servicesRef = React.useRef<HTMLElement>(null)

  const speechControls = new SpeechControls();
  const result = useVoiceControl(speechControls.getVoiceController(),{formControls :["username", "password", "login"], restart:true, sectionRefs:[homeRef,aboutRef,servicesRef]})

  useEffect(() => {
    if (result){
      console.log(result)
      const key = Object.keys(result)[0];
      const value =result[key];
      setValues({
       [key]: value
      });
    }
  }, [result]);

  useEffect(() => {
    speechControls.startRecognition()
  }, []);
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
