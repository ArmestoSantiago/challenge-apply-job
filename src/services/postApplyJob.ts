import { UserInformation } from "../types/types.d";

export const postApplyJob = async (user: UserInformation, repository: string, jobId: string) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const URL = `${BASE_URL}/api/candidate/apply-to-job`;

  const response = await fetch(URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "uuid": user.uuid,
        "jobId": jobId,
        "candidateId": user.candidateId,
        "repoUrl": repository
      })
    }
  );

  if (!response.ok) {
    throw new Error("Error applying to job");
  }

  const data = await response.json();

  console.log(data);

  return data;

};