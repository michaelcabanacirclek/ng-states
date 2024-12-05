import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserHttpClientService } from "../../user-http-client.service";
import { getUsers, setUsers } from "./user.actions";
import { exhaustMap, map, withLatestFrom } from "rxjs";
import { select, Store } from "@ngrx/store";
import { selectPagination } from "./user.selectors";

export const loadUsers = createEffect(
  (
    actions$ = inject(Actions),
    userHttpClient = inject(UserHttpClientService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(getUsers),
      withLatestFrom(store.pipe(select(selectPagination))),
      exhaustMap(([query, { page, size }]) =>
        userHttpClient
          .getUsers({ skip: `${page * size}`, limit: `${size}` })
          .pipe(map(({ users, total }) => setUsers({ users, total })))
      )
    ),
  { functional: true }
);
