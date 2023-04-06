// References --> 

import React from "react";
import { useState } from "react";
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import * as awarenessProtocol from 'y-protocols/awareness.js';
import './TextEditor.css';


const ydoc = new Y.Doc()
const provider = new WebrtcProvider(
  'webrtc-test',
  ydoc,
  {
    // signaling is what client use to find each other! using websockets...
    // start signaling from the client directory using `PORT=4444 ./signaling-server/server.js` command.
    signaling: ['ws://localhost:4444'],
    password: null,
    awareness: new awarenessProtocol.Awareness(ydoc),
    maxConns: 20, 
    filterBcConns: false,
    peerOpts: {}
  }
);

// const yarray = ydoc.getArray('array');
let ytext = ydoc.getText('text');

provider.on('synced', () => {
  // NOTE: This is only called when a different browser connects to this client
  // Windows of the same browser communicate directly with each other
  // Although this behavior might be subject to change.
  // It is better not to expect a synced event when using y-webrtc
  console.log('synced!')
});

ytext.observeDeep(() => {
  console.log('ytext updated: ', ytext.toJSON())
});

// yarray.insert(0, ['val']);

function TextEditor() {
  const [sharedText, setSharedText] = useState(ytext.toJSON());
  
  function handleChange(e) {
    // yarray[0] = "shivkant"; --> not working! should we use ytext that is the sharable text?
    // ytext.setAttribute(0, 'shivkant');
    const val = e.target.value;

    // setSharedText(ytext.toJSON());
    setSharedText(val);
  //   console.log('new ytext: ', ytext.toJSON());
  //   console.log('ytext ', ytext);
  //   console.log('sha', sharedText);
  }
  // function handleClick() {
  //   // yarray[0] = "shivkant"; --> not working! should we use ytext that is the sharable text?
  //   ytext.insert(0, 'shivkant');
  //   setSharedText(ytext.toJSON());
  //   console.log('new ytext: ', ytext.toJSON());
  // }
  return (
    <div>
      <textarea className="editorBox" onChange={(e) => handleChange(e)}>
        {sharedText}
      </textarea>
      {/* <button onClick={() => handleClick()}>click me</button> */}
    </div>
  );
}

export default TextEditor;
