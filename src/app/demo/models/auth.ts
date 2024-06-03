export interface AuthenticationRequest{
    username?:string;
    password?:string;
}
export interface AuthenticationResponse {
    username?: string;
    lastLoginDate?: Date;
    token?: string;
}
