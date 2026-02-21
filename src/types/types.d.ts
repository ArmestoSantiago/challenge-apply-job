export interface UserInformation {
  uuid: string;
  candidateId: string;
  applicationId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ErrorType {
  error: string;
}

export interface OpenPositionsType {
  id: string,
  title: string;
}
