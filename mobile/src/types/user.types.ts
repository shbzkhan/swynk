export type ApiResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
};
type VerifyOTPResponseData = {
  otpToken: string;
};
export type SendOTPResponse = ApiResponse<{}>;
export type VerifyOTPResponse = ApiResponse<VerifyOTPResponseData>;
