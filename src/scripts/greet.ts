import * as red from '../services/redis';
import * as type from '../types';

let ts: number;

export function greet(app: any) {
  app.message('sis', async ({message, say}: type.appMsg) => {
    const msgObject: {text: string} = JSON.parse(JSON.stringify(message));
    const textMsg: string = msgObject.text.toLowerCase();

    if (textMsg.includes('hello sis')) {
      const timeNow: Date = new Date();
      const hoursNow: number = timeNow.getHours();
      let greetText: string = '';

      if (hoursNow > 5 && hoursNow < 12) greetText = 'Good Morning!';
      else if (hoursNow > 12 && hoursNow < 18) greetText = 'Good Afternoon!';
      else greetText = 'Good Evening!';
      console.log(message.ts);
      ts = Number(message.ts);
      console.log(ts);
      await say(greetText.concat(` How are you today <@${message.user}>`));
    }
  });
}

export function greetRes(app: any) {
  app.message(
    /(fine)|(good)|(okay)|(sad)|(happy)|(fantastic)|(robot)/,
    async ({message, say}: type.appMsg) => {
      if (Number(message.ts) - ts < 8) {
        const msgObject: {text: string} = JSON.parse(JSON.stringify(message));
        console.log(msgObject);
        const textMsg: string = msgObject.text.toLowerCase();

        if (
          (textMsg.includes('fine') && !textMsg.includes('not')) ||
          (textMsg.includes('good') && !textMsg.includes('not')) ||
          (textMsg.includes('am okay') && !textMsg.includes('not')) ||
          textMsg.includes('fantastic')
        ) {
          await say('Good to Hear!');
        }
        if (
          textMsg.includes('not fine') ||
          textMsg.includes('not good') ||
          textMsg.includes('not okay') ||
          textMsg.includes('sad')
        ) {
          await say('I hope you get well soon!');
        }
        if (textMsg.includes('robot')) {
          await say(
            '01001111 01010101 01010010 00100000 01010010 01001001 01010011 01000101 00100000 01001001 01010011 00100000 01010011 01001111 01001111 01001110 00100001 00100001'
          );
        }
      }
    }
  );
}

// import * as red from '../services/redis'
//
//
// export function name(app:any) {
//     app.message('lab', async({message, say} : {message: any; say: any}) =>{

//     })
// }
