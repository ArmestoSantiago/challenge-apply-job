import { useEffect, useState } from "react";
import { getOpenPositions } from "../services/getOpenPositions";
import { OpenPositionsType, UserInformation } from "../types/types.d";
import { postApplyJob } from "../services/postApplyJob";

interface JobsListProps {
  user?: UserInformation;
}

export function JobsList({ user }: JobsListProps) {
  const [openPositions, setOpenPositions] = useState<OpenPositionsType[]>([]);
  const [submited, setSubmited] = useState<boolean>(true);
  const [succeed, setSucceed] = useState<boolean | null>(null);
  const [error, setError] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setInputValue(value);
    console.log(inputValue);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>, job: OpenPositionsType) => {
    if (!user) return;
    setLoading(true);
    setSubmited(true);
    setInputValue("");
    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
    input.value = "";
    try {
      const data = await postApplyJob(user, inputValue, job.id);
      setSucceed(true);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
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
      {openPositions.map(position => {
        return <div className="jobs-list" key={position.id}>
          <span>{position.title}</span>
          <input onChange={handleChange} placeholder="Enter Your GitHub Repository" />
          {user ? <button onClick={(e) => handleSubmit(e, position)}>Submit</button> : <p>Log In To Apply</p>}
          {submited && <div className="post-modal">
            {!loading && <button onClick={() => { setSubmited(false); }}>X</button>}
            {loading && <p><strong>Espere por favor</strong></p>}
            {error && !loading && <p><strong>Error to apply</strong></p>}
            {succeed && !loading && <p><strong>You Applied Succefull</strong></p>}
          </div>
          }
        </div>;
      })}
    </div >
  );
}