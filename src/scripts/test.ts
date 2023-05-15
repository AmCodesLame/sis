import * as type from '../types';

export function ping(app: any) {
  app.message('ping', async ({message, say}: type.appMsg) => {
    console.log(JSON.parse(JSON.stringify(message)).text);
    await say('pong');
  });
}

export function echo(app: any) {
  app.message(/^sis echo/, async ({message, say}: type.appMsg) => {
    const msgObject: {text: string} = JSON.parse(JSON.stringify(message));
    await say(msgObject.text);
  });
}

export function time(app: any) {
  app.message(/^sis time/, async ({message, say}: type.appMsg) => {
    const time: Date = new Date();
    const current_time: string =
      time.getHours() +
      ':' +
      time.getMinutes() +
      ' on ' +
      time.getDate() +
      '/' +
      time.getMonth() +
      '/' +
      time.getFullYear();
    await say(`current time is: ${current_time}`);
  });
}

// import * as red from '../services/redis'

// export function name(app:any) {
//     app.message('lab', async({message, say} : {message: any; say: any}) =>{
//     const msgObject : {text: string} = JSON.parse(JSON.stringify(message));
//     console.log(msgObject)
//     const textMsg : string = msgObject.text.toLowerCase();
//     })
// }
