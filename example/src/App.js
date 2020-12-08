import React from "react";
import { Typography, Box } from "@material-ui/core";
import VoiceForm from "./VoiceForm";
function App() {
  return (
    <Box
      display="flex"
      style={{ textAlign: "center" }}
      flexDirection="column"
      height="100%"
      justifyContent="center"
    >
      <Typography variant="h4" component="h1">
        To set value say "set username [value] and set password [value]"
      </Typography>
        <VoiceForm />
    </Box>
  );
}

export default App;