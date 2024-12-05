import { createReducer, on } from "@ngrx/store";
import { setUsers, setPage, setSize } from "./user.actions";
import { UserState } from "../store.models";

export const initialState: UserState = {
  data: [],
  total: 0,
  page: 0,
  size: 10,
};

export const usersReducer = createReducer(
  initialState,
  on(setUsers, (_state, { total, users: data }) => ({
    ..._state,
    data,
    total,
  })),
  on(setPage, (_state, { page }) => ({ ..._state, page })),
  on(setSize, (_state, { size }) => ({ ..._state, size }))
);
