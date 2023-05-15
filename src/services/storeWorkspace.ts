import * as red from './redis';

export async function scrapeWorkspace(app: any, force: boolean = false) {
  try {
    // Retrieve all members of the Slack group
    console.log(!(await red.getValue('info')));
    if (!(await red.getValue('infoName')) && force) {
      const result = await app.client.users.list();
      const users = result.members;
      //   Store user information in Redis for each member
      const keyName = 'info:name';
      const keyId = 'info:id';
      let valueObjName = JSON.parse(await red.getValue(keyName)) ?? {};
      let valueObjId = JSON.parse(await red.getValue(keyId)) ?? {};
      for (const user of users) {
        if (!user.is_bot) {
          const realName = user.real_name;
          const email = user.profile?.email ?? 'N/A';
          const userName = user.profile?.display_name ?? 'N/A';

          const userKey = userName.split(' ')[0].toLowerCase();

          valueObjName[userKey][realName] = realName;
          valueObjName[userKey][email] = email;
          valueObjName[userKey][userName] = userName;

          valueObjName[user.id][userName] = userName;
          valueObjName[user.id][email] = email;
          valueObjName[user.id][realName] = realName;

          console.log(valueObjName, valueObjId);
        }
      }
      const valueName = JSON.stringify(valueObjName);
      const valueId = JSON.stringify(valueObjId);
      red.setValue(keyName, valueName);
      red.setValue(keyId, valueId);
      console.log('[REDIS] user info stored in redis');
      return;
    }

    console.log('[REDIS] User information is already stored in Redis');
  } catch (error) {
    console.error('Error retrieving user information from Slack API:', error);
  }
}

export function newScrape(app: any) {
  app.message(/^sis scan/, async ({message, say}: {message: any; say: any}) => {
    await scrapeWorkspace(app, true);
    await say('scanned the workspace again!');
  });
}
