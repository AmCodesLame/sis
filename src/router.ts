import {getApp} from './app'
import {ping} from './scripts/ping'
import {labStatus} from './scripts/labStatus'
import {greet, greetRes} from './scripts/greet'



let app = getApp();

ping(app);
labStatus(app);
greet(app);
greetRes(app)
