import * as red from '../services/redis';
import * as type from '../types';

export function score(app: any) {
  app.message(/^sis <@...........>/, async ({message, say}: type.appMsg) => {
    const msgObject: type.message = JSON.parse(JSON.stringify(message));
    // console.log(msgObject)
    const textMsg: string | undefined = msgObject.text?.toLowerCase();
    const userId: string | undefined = msgObject.text
      ?.replace('sis ', '')
      .split(' ')[0]
      .slice(2, -1);
    console.log(userId, msgObject.text);

    const userInfoId = JSON.parse(await red.getValue('info:id'));
    const userInfoName = JSON.parse(await red.getValue('info:name'));

    const decide: string | undefined = msgObject.text?.replace(
      /^sis <@...........>/,
      ''
    );

    const niceWords: Array<string> = ['amazing!', 'yay!', 'Splendid]'];
    if (decide == '++') {
      for (let user in userInfoId) {
        if (user == userId?.slice(0, -2)) {
          userInfoId[user]['score']
            ? (userInfoId[user]['score'] =
                Number(userInfoId[user]['score']) + 1)
            : (userInfoId[user]['score'] = '1');

          const adj: string =
            niceWords[Math.floor(Math.random() * niceWords.length)];
          await say(`${adj} now you are at score ${userInfoId[user]['score']}`);

          red.setValue('info:id', JSON.stringify(userInfoId));
        }
      }
    } else if (decide == '--') {
      for (let user in userInfoId) {
        if (user == userId?.slice(0, -2)) {
          userInfoId[user]['score']
            ? (userInfoId[user]['score'] =
                Number(userInfoId[user]['score']) - 1)
            : (userInfoId[user]['score'] = '-1');

          await say(`Ouch! now you are at score ${userInfoId[user]['score']}`);
          console.log(userInfoId);

          red.setValue('info:id', JSON.stringify(userInfoId));
        }
      }
    } else if (decide == ' score') {
      for (let user in userInfoId) {
        if (user == userId) {
          await say(`Currently you are at score ${userInfoId[user]['score']}`);
        }
      }
    }
  });
}
