import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "../store.models";

export const userFeature = createFeatureSelector<UserState>("users");

export const selectUsers = createSelector(userFeature, (state) => state.data);

export const selectTotal = createSelector(userFeature, (state) => state.total);

export const selectPagination = createSelector(userFeature, (state) => ({
  page: state.page,
  size: state.size,
}));
