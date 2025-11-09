export type ApiResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
};
export type VerifyOTPResponseData = {
  otpToken: string;
};
export type UserData =  {
  user: any;
  accessToken(arg0: string, accessToken: any): unknown;
  _id: string
  fullname: string
  username: string
  avatar: string
  createdAt: string
  updatedAt: string
  __v: number
}
export type SendOTPResponse = ApiResponse<{}>;
export type VerifyOTPResponse = ApiResponse<VerifyOTPResponseData>;
export type RegisterUserResponse = ApiResponse<UserData>;
export type LoginUserResponse = ApiResponse<UserData>;
export type CurrentUserResponse = ApiResponse<UserData>;
