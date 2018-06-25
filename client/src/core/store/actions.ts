import { Action } from "redux";

export interface Action<T extends string> {
  type: T;
}
export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P;
}

type ActionCreator = (...args: any[]) => Action<any>;
interface ActionCreatorMapObject {
  [action: string]: ActionCreator;
}
export type ActionUnion<A extends ActionCreatorMapObject> = ReturnType<
  A[keyof A]
>;

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type } : { type, payload };
}

export enum CORE {
  TOGGLE_NAV = "[core] Toggle Nav",
  LOGIN = "[core] Login",
  LOGOUT = "[core] Logout"
}

export const CoreActions = {
  login: (user: any) => createAction(CORE.LOGIN, user),
  logout: () => createAction(CORE.LOGOUT),
  toggleNav: (toggle?: boolean) => createAction(CORE.TOGGLE_NAV, toggle)
};

export type CoreActions = ActionUnion<typeof CoreActions>;

export const Actions = {
  core: CoreActions
};
