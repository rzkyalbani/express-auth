export type RegisterUserRequest = {
  username: string;
  email: string;
  password: string;
};

export type UserResponse = {
  id: string;
  username: string;
  email: string;
};
export type LoginUserRequest = {
  email: string;
  password: string;
};
