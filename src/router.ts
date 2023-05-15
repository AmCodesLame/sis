import {appMaker} from './app';
import {ping, echo, time} from './scripts/test';
import {labStatus} from './scripts/labStatus';
import {greet, greetRes} from './scripts/greet';
import {setRoles, getRoles} from './scripts/roles';
import {newScrape} from './services/storeWorkspace';
import {info} from './scripts/info';
import {help} from './scripts/help';
import {score} from './scripts/score';

let app = appMaker();

//testing
ping(app);
echo(app);
time(app);

//lab
labStatus(app);

//greet
greet(app);
greetRes(app);

//roles
setRoles(app);
getRoles(app);

//scan workspace for user info
newScrape(app);

//show user info
info(app);

//all cmds
help(app);

//score ++ and ==
score(app);
