import {
  signalStore,
  withState,
  withComputed,
  patchState,
  withMethods,
  withHooks,
} from "@ngrx/signals";
import { tapResponse } from "@ngrx/operators";
import { User, UserQuery } from "../../user.models";
import { computed, inject } from "@angular/core";
import { UserHttpClientService } from "../../user-http-client.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { distinctUntilChanged, pipe, switchMap } from "rxjs";
import { UserState } from "../store.models";

const initialState: UserState = {
  data: [],
  page: 0,
  size: 10,
  total: 0,
};

export const UserStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withComputed((store) => ({
    query: computed<UserQuery>(() => ({
      limit: `${store.size()}`,
      skip: `${store.size() * store.page()}`,
    })),
    columns: computed<(keyof User)[]>(() => {
      const obj = store.data()[0];
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
    }),
  })),
  withMethods((store, userHttpClient = inject(UserHttpClientService)) => ({
    updatePageSize: (size: number) => patchState(store, { size }),
    updatePage: (page: number) => patchState(store, { page }),
    getUsers: rxMethod<UserQuery>(
      pipe(
        // debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) =>
          userHttpClient.getUsers(query).pipe(
            tapResponse({
              next: (res) => {
                patchState(store, { data: res.users, total: res.total });
              },
              error: (err) => {
                patchState(store, { data: [], total: 0 });
              },
            })
          )
        )
      )
    ),
  })),
  withHooks({
    onInit: (store) => {
      store.getUsers(store.query);
    },
  })
);
