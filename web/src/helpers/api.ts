enum statusResponse {
  success = "success",
  fail = "fail",
}

export const checkSuccessResponse = (response: any) => {
  return response?.payload?.status === statusResponse.success;
};
