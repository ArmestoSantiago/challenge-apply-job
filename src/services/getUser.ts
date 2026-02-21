import { ErrorType, UserInformation } from "../types/types";

export const getUser = async () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const EMAIL = import.meta.env.VITE_EMAIL;
  const URL = `${BASE_URL}/api/candidate/get-by-email?email=${EMAIL}`;

  const response = await fetch(URL);
  if (!response.ok) {
    const data: ErrorType = await response.json();
    throw new Error(data.error);
  }

  const data: UserInformation = await response.json();

  const {
    uuid,
    candidateId,
    applicationId,
    firstName,
    lastName,
    email
  } = data;

  return {
    uuid, candidateId, applicationId, firstName, lastName, email
  };

};