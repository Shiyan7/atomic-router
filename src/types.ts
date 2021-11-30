import { Effect, Event, Store } from 'effector';

export type RouteParams = Record<string, any>;

export type RouteQuery = Record<string, any>;

export type RouteParamsAndQuery<Params extends RouteParams> = {
  params: Params;
  query: RouteQuery;
};

export type RouteInstance<Params extends RouteParams> = {
  $isOpened: Store<boolean>;
  $params: Store<Params>;
  $query: Store<RouteQuery>;
  opened: Event<RouteParamsAndQuery<Params>>;
  updated: Event<RouteParamsAndQuery<Params>>;
  left: Event<void>;
  navigate: Effect<RouteParamsAndQuery<Params>, RouteParamsAndQuery<Params>>;
  open: Effect<Params, RouteParamsAndQuery<Params>>;
};

// @ts-expect-error
export type PathCreator<Params extends RouteParams> = string;

// https://dev.to/0916dhkim/type-safe-usage-of-react-router-5c44
type ExtractRouteParams<T> = string extends T
  ? Record<string, string>
  : T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? { [k in Param | keyof ExtractRouteParams<Rest>]: string }
  : T extends `${infer _Start}:${infer Param}`
  ? { [k in Param]: string }
  : RouteParams;

export type PathParams<P extends string> = ExtractRouteParams<P>;
