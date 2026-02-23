import { useState } from "react";
import { UserInformation } from "../types/types";

export type RequestStatus = "loading" | "succeed" | "error" | "github" | null;
interface callback {
  user: UserInformation,
  repository: string,
  jobId: string;
}

export const useRequestStatus = () => {
  const [status, setStatus] = useState<RequestStatus>(null);


  const sendRequest = async <T extends any[]>(
    callback: (...args: T) => Promise<any>,
    ...args: T
  ) => {
    try {
      setStatus("loading");
      const data = await callback(...args);
      setStatus("succeed");
    } catch (err) {
      setStatus("error");
    }
  };

  return { status, setStatus, sendRequest };
};