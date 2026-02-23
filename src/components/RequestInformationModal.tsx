import { RequestStatus } from "../hooks/useRequestStatus";
interface RequestInformationModalProps {
  status: RequestStatus;
  setStatus: (status: RequestStatus) => void;
}
export function RequestInformationModal({ status, setStatus }: RequestInformationModalProps) {

  return status ? <div className="post-modal">
    {!(status === "loading") && <button onClick={() => { setStatus(null); }}>X</button>}
    {status === "github" && <p><strong>Enter a valid GitHub Repository</strong></p>}
    {status === "succeed" && <p><strong>You applied Successfully</strong></p>}
    {status === "error" && <p><strong>Error while apply</strong></p>}
  </div> : null;

}