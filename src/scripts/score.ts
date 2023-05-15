import * as red from '../services/redis';

export function score(app: any) {
  app.message(
    /^sis <@...........>/,
    async ({message, say}: {message: any; say: any}) => {
      const msgObject: {text: string} = JSON.parse(JSON.stringify(message));
      // console.log(msgObject)
      const textMsg: string = msgObject.text.toLowerCase();
      const userId = msgObject.text
        .replace('sis ', '')
        .split(' ')[0]
        .slice(2, -1);
      console.log(userId, msgObject.text);

      const userInfoId = JSON.parse(await red.getValue('info:id'));
      const userInfoName = JSON.parse(await red.getValue('info:name'));

      const decide: string = msgObject.text.replace(/^sis <@...........>/, '');

      const niceWords: Array<string> = ['amazing!', 'yay!', 'Splendid]'];
      console.log(69, userInfoId);
      console.log(userInfoId[userId]);
      if (decide == '++') {
        for (let user in userInfoId) {
          if (user == userId.slice(0, -2)) {
            userInfoId[user]['score']
              ? (userInfoId[user]['score'] =
                  Number(userInfoId[user]['score']) + 1)
              : (userInfoId[user]['score'] = '1');

            const adj = niceWords[Math.floor(Math.random() * niceWords.length)];
            await say(
              `${adj} now you are at score ${userInfoId[user]['score']}`
            );
            console.log(userInfoId);

            red.setValue('info:id', JSON.stringify(userInfoId));
          }
        }
      } else if (decide == '--') {
        for (let user in userInfoId) {
          if (user == userId.slice(0, -2)) {
            userInfoId[user]['score']
              ? (userInfoId[user]['score'] =
                  Number(userInfoId[user]['score']) - 1)
              : (userInfoId[user]['score'] = '-1');

            await say(
              `Ouch! now you are at score ${userInfoId[user]['score']}`
            );
            console.log(userInfoId);

            red.setValue('info:id', JSON.stringify(userInfoId));
          }
        }
      } else if (decide == ' score') {
        for (let user in userInfoId) {
          if (user == userId) {
            console.log(user);
            await say(
              `Currently you are at score ${userInfoId[user]['score']}`
            );
            console.log(userInfoId);
          }
        }
      }
    }
  );
}
