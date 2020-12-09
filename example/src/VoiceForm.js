import React from "react";
import { useVoice } from "voiceui-react";
import { useEffect, useState, useRef } from "react";
import { Container, TextField, Box, Typography } from "@material-ui/core";
function VoiceForm() {
  const [values, setValues] = useState({ username: "", password: "" });
  const homeRef = useRef();
  const aboutRef = useRef();
  const servicesRef = useRef();
  const result = useVoice({inputs :["username", "password", "login"], restart:true, sections:[homeRef,aboutRef,servicesRef]})

  useEffect(() => {
    if (result){
      const key = Object.keys(result)[0];
      const value = result.append ? values[key] + result[key] : result[key];
      setValues({
       [key]: value
      });
    }
  }, [result, values]);

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
        <Container maxWidth="sm">
          <Typography ref={homeRef} id="home" component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} >
            <h1>Home Section </h1>
            <h3>To scroll to this section say "go to home" / "please go to home section"
            Pattern for Scrolling: * | go to | section-id | * </h3>
        </Typography>
        </Container>
        <Container maxWidth="sm">
          <Typography ref={aboutRef} id="about" component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} >
            <h1>About Section</h1>
        </Typography>
        </Container>
        <Container maxWidth="sm">
          <Typography ref={servicesRef} id="services" component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} >
            <h1>Services Section</h1>
        </Typography>
        </Container>
      </Box>
    </div>
  );
}

export default VoiceForm;
