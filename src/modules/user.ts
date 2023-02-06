import LoggerAPI from 'apis/logger';
import { CONFIG } from 'utils/config';

const OBSERVING_INTERVAL = 10 * 1000;
const MAX_VISIBLE_SENDING_COUNT = 100;
const MAX_SENDING_COUNT = 50;
const MAX_VISIBLE_COUNT_LIMITATION = 500;
const MAX_COUNT_LIMITATION = 50;

class User {
  private _sessionId = '';

  constructor() {
    this.startObserving();
  }
}

export default User;
