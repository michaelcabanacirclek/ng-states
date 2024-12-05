import { createAction, createActionGroup, props } from "@ngrx/store";
import { User } from "../../user.models";

export const getUsers = createAction("[User] get Users");

export const setUsers = createAction(
  "[User] set Users",
  props<{ users: User[]; total: number }>()
);

export const setPage = createAction(
  "[User] set Page",
  props<{ page: number }>()
);

export const setSize = createAction(
  "[User] set Size",
  props<{ size: number }>()
);
