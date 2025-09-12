export type User = {
    userId: string;
    userName: string;
    userType: UserType;
}

export type UserType = 'ADMIN' | 'USER';