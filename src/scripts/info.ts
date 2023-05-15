import * as red from '../services/redis';
import * as type from '../types';

export function info(app: any) {
  app.message(/^sis info/, async ({message, say}: type.appMsg) => {
    const msgObject: {text: string} = JSON.parse(JSON.stringify(message));
    // console.log(msgObject)
    const textMsg: string = msgObject.text.toLowerCase();

    const user: string = textMsg.replace('sis info ', '').split(' ')[0];
    const userInfo = JSON.parse(await red.getValue('info:name'));
    console.log(userInfo);

    await say({
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: `${userInfo[user].realName}`,
            emoji: true,
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `email: ${userInfo[user].email}`,
          },
        },
      ],
    });
  });
}
