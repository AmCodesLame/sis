import {getApp} from './app'
import {ping} from './scripts/ping'
import {labStatus} from './scripts/labStatus'



let app = getApp();

ping(app);
labStatus(app);
