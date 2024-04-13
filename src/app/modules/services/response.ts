export interface ApiResponse<T> {
    status: string;
    message: string;
    code: number;
    data: T;
}