/**
 * 
 * @param {ErrorObject} error 
 * @returns error response
 */
function ErrorResponse(error) {
  return {
    success: false,
    error: {
      name: error?.name ?? 'Unknown Error',
      status: error?.status ?? 500,
      message: error?.message ?? "empty message",
      reason: error?.reason ?? "empty reason",
    },
  };
}
// export ErrorResponse
module.exports = ErrorResponse;
