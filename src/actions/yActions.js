import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

export default function (){

  const ydoc = new Y.Doc();

  const websocketProvider = new WebsocketProvider('wss://api.rainbowkereru.com:1234', 'flow-editor', ydoc)

  const yArray = ydoc.getMap('')


  return ydoc;
}
