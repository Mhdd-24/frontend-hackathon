export interface UserLoginResponse {
    mobileno: string | null;
    status: string;
    otp: string | null;
    message: string;
    email: string | null;
    username: string;
}