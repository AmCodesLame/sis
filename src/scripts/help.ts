import * as red from '../services/redis';
import * as type from '../types';

export function help(app: any) {
  app.message(/^sis help/, async ({message, say}: type.appMsg) => {
    const msgObject: {text: string} = JSON.parse(JSON.stringify(message));
    console.log(msgObject);
    const textMsg: string = msgObject.text.toLowerCase();

    if (textMsg == 'sis help') {
      await say(
        `here are all my commands:\n \`\`\` is lab open/close | lab open/close? | lab open/close hai kya? : tells you about lab open/close status \n lab is open/close | open/close lab : toggles the lab open/close status \n hello sis : greetings \n ping : pong \n sis echo : repeats the line you said \n sis info <username> : info about the user \n sis @username is <role> : set the usernames role \n sis scan workspace : will scan the entire workspace and rewrite the DB \n sis @user++/@user-- : adds/substracts score from user \n sis @user score : shows current score of the user \`\`\``
      );
    }
  });
}
