import React from "react";
import { VoiceContext } from "voiceui-react";
import { useContext, useEffect, useState } from "react";
import { Container, TextField, Box } from "@material-ui/core";
function VoiceForm() {
  const voiceContext = useContext(VoiceContext);
  const [values, setValues] = useState({ username: "", password: "" });
  useEffect(() => {
    voiceContext.setInputs(["username", "password", "login"]);
  }, []);

  useEffect(() => {
    if (voiceContext.result)
      setValues({
        [Object.keys(voiceContext.result)[0]]:
          voiceContext.result[Object.keys(voiceContext.result)[0]],
      });
  }, [voiceContext.result]);
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
