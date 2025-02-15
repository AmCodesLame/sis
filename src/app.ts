import * as dotenv from 'dotenv';
dotenv.config();

import {App} from '@slack/bolt';
import {redisInit, isReady} from './services/redis';
import {scrapeWorkspace} from './services/storeWorkspace';
import * as type from './types';

//create app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

//exporting app for router
export function appMaker() {
  return app;
}

//initializing
async function init() {
  await app.start(process.env.PORT || 3000);
  console.log('[APP] app is running');
  await redisInit();
  await scrapeWorkspace(app, true);
  console.log(isReady());
}

//will run the router file
import './router';

init();
