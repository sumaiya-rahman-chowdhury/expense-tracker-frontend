import axios from "axios";

/**
 * Extracts a human-readable error message from Axios or JS errors.
 */
export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || "An error occurred";
  } else if (err instanceof Error) {
    return err.message;
  } else {
    return "An unexpected error occurred";
  }
}
