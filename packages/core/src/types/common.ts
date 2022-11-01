/* eslint-disable @typescript-eslint/no-explicit-any */
export enum State {
  Init = 'Init',
  Pending = 'Pending',
  Done = 'Done',
  Error = 'Error',
}

export interface Mutable<T> {
  state: State;
  data?: T;
  message?: string;
}

export type Dispatch<T> = (value: T) => void;

export interface Data {
  [k: string]: any | undefined;
}

export interface Actions {
  [k: string]: Dispatch<any> | undefined;
}

export interface StateActions<T> extends Actions {
  state?: Dispatch<State>;
  data?: Dispatch<T | undefined>;
  message?: Dispatch<string | undefined>;
}

export interface Callbacks {
  connect?: () => void;
  disconnect?: () => void;
}
