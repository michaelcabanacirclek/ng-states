export type User = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  birthDate: string;
  role: "admin" | "moderator" | "user";
};

export type UserResponse = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

export type UserQuery = {
  sort?: { key: string; order: "asc" | "desc" | "" };
  search?: string;
  skip?: string;
  limit?: string;
};
