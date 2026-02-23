import { useEffect, useState } from "react";
import { getOpenPositions } from "../services/getOpenPositions";
import { OpenPositionsType, UserInformation } from "../types/types.d";
import { postApplyJob } from "../services/postApplyJob";
import { useRequestStatus } from "../hooks/useRequestStatus";
import { RequestInformationModal } from "./RequestInformationModal";

interface JobsListProps {
  user?: UserInformation;
}

export function JobsList({ user }: JobsListProps) {
  const [error, setError] = useState<true | null>(null);
  const [openPositions, setOpenPositions] = useState<OpenPositionsType[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const { status, setStatus, sendRequest } = useRequestStatus();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setInputValue(value);

  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>, job: OpenPositionsType) => {
    if (!user) return;
    if (!inputValue.includes("github.com/")) {
      setStatus("github");
      return;
    }
    setInputValue("");
    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
    input.value = "";
    sendRequest(postApplyJob, user, inputValue, job.id);
  };

  useEffect(() => {
    const getPositions = async () => {
      try {
        const openPositions = await getOpenPositions();
        setOpenPositions(openPositions);

      } catch (err) {
        setError(true);
      }
    };

    getPositions();
  }, []);

  return (
    <div>
      {error && <strong><p>Error loading open positions</p></strong>}
      {openPositions.map(position => {
        return <div className="jobs-list" key={position.id}>
          <span>{position.title}</span>
          <input onChange={handleChange} placeholder="GitHub Repository" />
          {user ? <button onClick={(e) => handleSubmit(e, position)}>Submit</button> : <p>Log In To Apply</p>}
          <RequestInformationModal status={status} setStatus={setStatus} />
        </div>;
      })}
    </div >
  );
}