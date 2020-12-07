# voiceui-react

> Voicebased controllfor react applications

[![NPM](https://img.shields.io/npm/v/voiceui-react.svg)](https://www.npmjs.com/package/voiceui-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save voiceui-react
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'voiceui-react'
import 'voiceui-react/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```
## Feature: Scroll to Section
Command Pattern ``` * | go to | <section-id> | * ```
Example: "Go to home" , "Please go to about section", "Go to services section please"
## Usage
```jsx 
import React from "react";
import { VoiceContext } from "voiceui-react";
import { useContext, useEffect, useRef } from "react";
function VoiceForm() {
  const voiceContext = useContext(VoiceContext);
  const homeRef = useRef();
  const aboutRef = useRef();
  useEffect(() => {
    voiceContext.setScrollableSections([homeRef,aboutRef]);
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
        <div ref={homeRef} id="home">
          Home Section
        </div>
        <div ref={aboutRef} id="about">
          About Section
        </div>
    </div>
  );
}

export default VoiceForm;
```

## License

MIT © [hexad3cimal](https://github.com/hexad3cimal)
