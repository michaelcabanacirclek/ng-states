import { Action, NgxsOnInit, Selector, State, StateContext } from "@ngxs/store";
import { UserState } from "../store.models";
import { Injectable } from "@angular/core";
import { GetUsers, SetPage, SetSize } from "./user.actions";
import { UserHttpClientService } from "../../user-http-client.service";
import { tap } from "rxjs";
import { User } from "../../user.models";

@State<UserState>({
  name: "user",
  defaults: { data: [], page: 0, size: 10, total: 0 },
})
@Injectable()
export class UserStore implements NgxsOnInit {
  @Selector() static getUsers(state: UserState) {
    return state.data;
  }

  @Selector() static getTotal(state: UserState) {
    return state.total;
  }

  @Selector() static getPage(state: UserState) {
    return state.page;
  }

  @Selector() static getSize(state: UserState) {
    return state.size;
  }

  @Selector() static getColumns(state: UserState) {
    const obj = state.data[0];
    const acceptedKeys: (keyof User)[] = [];

    if (obj) {
      const keys = Object.keys(obj) as (keyof User)[];
      for (const key of keys) {
        if (typeof obj[key] !== "object") {
          acceptedKeys.push(key);
        }
      }
    }

    return acceptedKeys;
  }

  constructor(private userHttpClient: UserHttpClientService) {}
  ngxsOnInit(ctx: StateContext<any>): void {
    ctx.dispatch(new GetUsers());
  }

  @Action(GetUsers)
  getUsers(ctx: StateContext<UserState>) {
    const state = ctx.getState();

    const { page, size } = state;

    return this.userHttpClient
      .getUsers({
        limit: `${size}`,
        skip: `${page * size}`,
      })
      .pipe(
        tap((res) => ctx.patchState({ data: res.users, total: res.total }))
      );
  }

  @Action(SetPage)
  setPage(ctx: StateContext<UserState>, action: SetPage) {
    ctx.patchState({ page: action.page });
    ctx.dispatch(GetUsers);
  }

  @Action(SetSize)
  setSize(ctx: StateContext<UserState>, action: SetSize) {
    ctx.patchState({ size: action.size, page: 0 });
    ctx.dispatch(GetUsers);
  }
}
