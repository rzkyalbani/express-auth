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

export type ExpiresIn = '1d' | '7d' | '15m' | '30m';
