import { User } from "../user.models";

export type UserState = {
  data: User[];
  page: number;
  size: number;
  total: number;
};
