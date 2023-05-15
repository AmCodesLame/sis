export interface message {
  user?: string;
  ts?: string;
  text?: string;
}

export interface appMsg {
  message: message;
  say: Function;
}

export interface userInfoId {
  userId: {
    realName: string;
    displayName: string;
    email?: string;
    score?: string;
  };
}
