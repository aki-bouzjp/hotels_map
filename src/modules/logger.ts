import LoggerAPI from 'apis/logger';
import { CONFIG } from 'utils/config';

const OBSERVING_INTERVAL = 10 * 1000;
const MAX_VISIBLE_SENDING_COUNT = 100;
const MAX_SENDING_COUNT = 50;
const MAX_VISIBLE_COUNT_LIMITATION = 500;
const MAX_COUNT_LIMITATION = 50;

class Logger {
  private _sessions: App.Logger.Session[] = [];
  private _selects: App.Logger.Select[] = [];
  private _feedbacks: App.Logger.Feedback[] = [];
  private _logs: App.Logger.Log[] = [];
  private _isSendingSessions: boolean = false;
  private _isSendingSelects: boolean = false;
  private _isSendingFeedbacks: boolean = false;
  private _isSendingLogs: boolean = false;
  private _timerId = -1;
  private _sessionId = '';

  constructor() {
    this.startObserving();
  }

  private observe() {
    this._sessions.length  > 0 && this.sendSessions();
    this._selects.length   > 0 && this.sendSelects();
    this._feedbacks.length > 0 && this.sendFeedbacks();
    this._logs.length      > 0 && this.sendLogs();
  }

  public startObserving() {
    this._timerId = window.setInterval(this.observe.bind(this), OBSERVING_INTERVAL);
  }

  public stopObserving() {
    clearInterval(this._timerId);
    this._timerId = -1;
  }

  private sendSessions() {
    if (this._isSendingSessions) {
      return;
    }
    this._isSendingSessions = true;
    const sessions = this._sessions.concat().slice(0, MAX_SENDING_COUNT);
    new LoggerAPI().sessions(sessions).then(() => {
      this._sessions = this._sessions.reduce((updateSessions: App.Logger.Session[], session) => {
        if (sessions.find((targetSession: App.Logger.Session) => targetSession.created === session.created)) {
          return updateSessions;
        }
        return [...updateSessions, session];
      }, []);
    }).catch((error) => {
      console.error(error);
      if (error.status !== 0) {
        this.log('error_internal', error.text || error.toString(), this._sessionId);
      }
    }).finally(() => {
      this._isSendingSessions = false;
    });
  }

  private sendSelects() {
    if (this._isSendingSelects) {
      return;
    }
    this._isSendingSelects = true;
    const selects = this._selects.concat().slice(0, MAX_SENDING_COUNT);
    new LoggerAPI().selects(this._selects).then(() => {
      this._selects = this._selects.reduce((updateSelects: App.Logger.Select[], select) => {
        if (selects.find(targetSelect => targetSelect.created === select.created)) {
          return updateSelects;
        }
        return [...updateSelects, select];
      }, []);
    }).catch((error) => {
      console.error(error);
      if (error.status !== 0) {
        this.log('error_internal', error.text || error.toString(), this._sessionId);
      }
    }).finally(() => {
      this._isSendingSelects = false;
    });
  }

  private sendFeedbacks() {
    if (this._isSendingFeedbacks) {
      return;
    }
    this._isSendingFeedbacks = true;
    const feedbacks = this._feedbacks.concat().slice(0, MAX_SENDING_COUNT);
    new LoggerAPI().feedbacks(this._feedbacks).then(() => {
      this._feedbacks = this._feedbacks.reduce((updateFeedbacks: App.Logger.Feedback[], feedback) => {
        if (feedbacks.find(targetFeedback => targetFeedback.created === feedback.created)) {
          return updateFeedbacks;
        }
        return [...updateFeedbacks, feedback];
      }, []);
    }).finally(() => {
      this._isSendingFeedbacks = false;
    });
  }

  private sendLogs() {
    if (this._isSendingLogs) {
      return;
    }
    this._isSendingLogs = true;
    const logs = this._logs.concat().slice(0, MAX_SENDING_COUNT);
    new LoggerAPI().logs(this._logs).then(() => {
      this._logs = this._logs.reduce((updateLogs: App.Logger.Log[], log) => {
        if (logs.find(targetLog => targetLog.created === log.created)) {
          return updateLogs;
        }
        return [...updateLogs, log];
      }, []);
    }).catch((error) => {
      console.error(error);
      if (error.status !== 0) {
        this.log('error_internal', error.text || error.toString(), this._sessionId);
      }
    }).finally(() => {
      this._isSendingLogs = false;
    });
  }

  public session(sessionId: string) {
    if (
      this._sessions.length > MAX_VISIBLE_COUNT_LIMITATION ||
      CONFIG.DEBUG
    ) { return; }
    this._sessionId = sessionId;
    this._sessions.push({
      session_id: sessionId,
      created: Math.floor(new Date().getTime() / 1000),
    });
    this.sendSessions();
  }

  public select(
    sessionId: string,
    feature: Feature,
    zoomLevel: number,
  ) {
    if (
      this._selects.length > MAX_COUNT_LIMITATION ||
      CONFIG.DEBUG
    ) { return; }
    const { auction_id, cps } = feature.properties;
    this._selects.push({
      session_id: sessionId,
      auction_id,
      cps,
      zoom_level: zoomLevel,
      promotion_type: 'card',
      created: Math.floor(new Date().getTime() / 1000),
    });
    this.sendSelects();
  }

  public feedback(
    sessionId: string,
    feature: Feature,
    zoomLevel: number,
    type: App.Logger.FeedbackTypes
  ) {
    if (
      this._feedbacks.length > MAX_COUNT_LIMITATION ||
      CONFIG.DEBUG
    ) { return; }
    const { auction_id, cps } = feature.properties;
    this._feedbacks.push({
      session_id: sessionId,
      auction_id,
      cps,
      zoom_level: zoomLevel,
      type,
      action: type,
      description: '',
      created: Math.floor(new Date().getTime() / 1000),
    });
    this.sendFeedbacks();
  }

  public log(
    type: string,
    description: string | object | Error,
    sessionId?: string,
    feature?: Feature,
  ) {
    let parsedDescription: string;
    if (description instanceof Error) {
      parsedDescription = description.message;
    } else if (typeof description === 'object') {
      parsedDescription = JSON.stringify(description);
    } else {
      parsedDescription = description;
    }
    if (
      this._logs.length > MAX_COUNT_LIMITATION ||
      CONFIG.DEBUG
    ) { return; }
    const { properties } = feature || {};
    const { auction_id, cps } = properties || {};
    this._logs.push({
      type,
      description: parsedDescription,
      session_id: sessionId,
      auction_id,
      cps,
      created: Math.floor(new Date().getTime() / 1000),
    });
    this.sendLogs();
  }
}

export default Logger;
