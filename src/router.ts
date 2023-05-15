import {getApp} from './app'
import {ping, echo, time} from './scripts/test'
import {labStatus} from './scripts/labStatus'
import {greet, greetRes} from './scripts/greet'
import {setRoles, getRoles} from './scripts/roles'
import {newScrape} from './services/storeWorkspace'
import {info} from './scripts/info'


let app = getApp();

ping(app);
echo(app);
time(app);
labStatus(app);
greet(app);
greetRes(app)
setRoles(app);
getRoles(app);
newScrape(app);
info(app)