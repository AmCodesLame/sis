import {getApp} from './app'

let app = getApp();

interface msg {
  text : string;
}

app.message('ping', async ({ message, say })=> {
  console.log(message);
    await say('pong');
});

