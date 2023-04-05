import React from "react";
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import * as awarenessProtocol from 'y-protocols/awareness.js';


const ydoc = new Y.Doc()
const provider = new WebrtcProvider(
  'webrtc-test',
  ydoc,
  {
    // signaling is what client use to find each other! using websockets...
    // signaling: ['ws://192.168.0.102:4444'],
    signaling: ['ws://localhost:4444'],
    password: null,
    awareness: new awarenessProtocol.Awareness(ydoc),
    maxConns: 20,
    filterBcConns: false,
    peerOpts: {}
  }
);
const yarray = ydoc.getArray();

provider.on('synced', synced => {
  // NOTE: This is only called when a different browser connects to this client
  // Windows of the same browser communicate directly with each other
  // Although this behavior might be subject to change.
  // It is better not to expect a synced event when using y-webrtc
  console.log('synced!', synced)
});

yarray.observeDeep(() => {
  console.log('yarray updated: ', yarray.toJSON())
});

function Text_Editor() {
  console.log(Y);
  return (
    <>
      
    </>
  );
}

export default Text_Editor;
