export declare function createUser({ name, email, password_hash, role }: {
    name: string;
    email: string;
    password_hash: string;
    role: string;
}): Promise<{
    id: number;
    name: string;
    email: string;
    password_hash: string;
    role: string;
    is_verified: boolean;
    created_at: Date;
}>;
export declare function findUserByEmail(email: string): Promise<{
    id: number;
    name: string;
    email: string;
    password_hash: string;
    role: string;
    is_verified: boolean;
    created_at: Date;
}>;
export declare function findUserById(id: number): Promise<{
    id: number;
    name: string;
    email: string;
    password_hash: string;
    role: string;
    is_verified: boolean;
    created_at: Date;
}>;
export declare function setUserVerified(userId: number): Promise<{
    id: number;
    name: string;
    email: string;
    password_hash: string;
    role: string;
    is_verified: boolean;
    created_at: Date;
}[]>;
export declare function createEmailToken({ user_id, token, expires_at }: {
    user_id: number;
    token: string;
    expires_at: Date;
}): Promise<{
    id: number;
    created_at: Date;
    user_id: number;
    token: string;
    expires_at: Date;
}>;
export declare function findEmailToken(token: string): Promise<{
    id: number;
    user_id: number;
    token: string;
    expires_at: Date;
    created_at: Date;
}>;
export declare function deleteEmailToken(id: number): Promise<import("pg").QueryResult<never>>;
export declare function createPasswordResetToken({ user_id, token, expires_at }: {
    user_id: number;
    token: string;
    expires_at: Date;
}): Promise<{
    id: number;
    created_at: Date;
    user_id: number;
    token: string;
    expires_at: Date;
}>;
export declare function findPasswordToken(token: string): Promise<{
    id: number;
    user_id: number;
    token: string;
    expires_at: Date;
    created_at: Date;
}>;
export declare function deletePasswordToken(id: number): Promise<import("pg").QueryResult<never>>;
export declare function updateUserPassword(userId: number, password_hash: string): Promise<import("pg").QueryResult<never>>;
//# sourceMappingURL=repository.d.ts.map