import { successToast, errorToast } from "./toast";

export const handleApiResponse = (response) => {
  const { status, data } = response;

  switch (status) {
    case 200:
    case 201:
      successToast(data.message);
      return true;

    case 400:
    case 401:
    case 403:
    case 404:
    case 409:
    case 422:
    case 500:
      errorToast(data.message);
      return false;

    default:
      errorToast("Something went wrong.");
      return false;
  }
};

export const handleApiError = (error) => {
  const status = error.response?.status;
  const message =
    error.response?.data?.message || "Something went wrong.";

  switch (status) {
    case 400:
    case 401:
    case 403:
    case 404:
    case 409:
    case 422:
    case 500:
      errorToast(message);
      break;

    default:
      errorToast(message);
  }
};