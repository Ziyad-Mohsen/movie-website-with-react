export type AuthUser = {
  username: string;
  sessionId: string;
  email: string;
};

export type AuthStore = {
  authUser: null | AuthUser;
};
